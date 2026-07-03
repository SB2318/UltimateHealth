const expressAsyncHandler = require("express-async-handler");
const ArticleTag = require("../models/ArticleModel");
const Article = require("../models/Articles");
const User = require("../models/UserModel");
const statusEnum = require("../utils/StatusEnum");
const Podcast = require("../models/Podcast");
const Comment = require("../models/commentSchema");
const PlayList = require("../models/playlistSchema");
const AudioLikeAggregate = require('../models/events/audioLikeEventSchema');
const AudioViewAggregate = require('../models/events/audioViewEventSchema');
const { deleteFileFn } = require('./uploadController');
const { sendPodcastForReviewEmail } = require("./emailservice");

const mongoose = require('mongoose');

/** Podcast profile */
const getPodcastProfile = expressAsyncHandler(

    async (req, res) => {

        let userId = req.query.userId;
        try {
            if (!userId) {
                userId = req.userId;
            }
            const user = await User.findById(userId).populate('user_name Profile_image followers').lean().exec();

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const allPodcasts = await Podcast.find({
                user_id: userId,
                status: statusEnum.statusEnum.PUBLISHED
            })
                .populate('tags')
                .sort({ updated_at: -1 });

            const allPlaylists = await PlayList.find({ user: userId })
                .populate({
                    path: 'podcasts',
                    match: { user_id: userId, status: statusEnum.statusEnum.PUBLISHED },
                    populate: {
                        path: 'tags',
                    }
                }).sort({
                    updated_at: -1
                });

            // filter all standalonepodcast and playlists
            const playListPodcastIds = new Set(
                allPlaylists.flatMap((playlist) => playlist.podcasts.map(p => p._id.toString()))
            );

            const standalonepodcast = allPodcasts.filter((podcast) => !playListPodcastIds.has(podcast._id.toString()));

            res.status(200).json({
                podcasts: standalonepodcast,
                playlists: allPlaylists,
                user: user
            });

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

/** Podcast of all following authors */
const getFollowingsPodcasts = expressAsyncHandler(
    async (req, res) => {

        try {

            const user = await User.findById(req.userId).lean();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.followings || user.followings.length === 0) {
                return res.status(200).json([]);
            }


            const podcasts = await Podcast.find({
                user_id: { $in: user.followings },
                status: statusEnum.statusEnum.PUBLISHED
            })
                .populate('tags')
                .populate('user_id', 'user_name Profile_image followers')
                .sort({
                    updated_at: -1
                })
                .lean()
                .exec();



            res.status(200).json(podcasts);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

/** get all playlists of mine (for profile section) */
const getMyPlayLists = expressAsyncHandler(

    async (req, res) => {

        try {
            const playlists = await PlayList.find({ user: req.userId })
                .sort({
                    updated_at: -1
                });
            return res.status(200).json(playlists);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }

);

/** Get all podcasts for one playlist */
const getPodcastsByPlaylistId = expressAsyncHandler(
    async (req, res) => {

        try {

            const { playlist_id } = req.query;

            if (!playlist_id) {
                return res.status(400).json({ message: 'Playlist id is required' });
            }

            const playlist = await PlayList.findById(playlist_id).populate({
                path: 'podcasts',
                match: { is_removed: false, status: statusEnum.statusEnum.PUBLISHED },
                populate: [
                    {
                        path: 'user_id',
                        select: 'user_name Profile_image followers'
                    },
                    {
                        path: 'tags'
                    }
                ]
            })
                .sort({
                    updated_at: -1
                })
                .lean().exec();

            if (!playlist) {
                return res.status(404).json({ message: 'Playlist not found' });
            }

            return res.status(200).json(playlist.podcasts);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
);

/** Get all published podcasts (most recent uploaded) */

const getAllPublishedPodcasts = expressAsyncHandler(
    async (req, res) => {
        try {

            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * parseInt(limit);

            const allPodcasts = await Podcast.find({
                status: statusEnum.statusEnum.PUBLISHED
            }).populate('tags')
                .populate('user_id', 'user_name user_handle Profile_image')
                .sort({ updated_at: -1 })
                .skip(skip)
                .limit(Number(limit))
                .exec();

            if (Number(page) === 1) {
                const totalPodcasts = await Podcast.countDocuments({
                    status: statusEnum.statusEnum.PUBLISHED
                });
                const totalPages = Math.ceil(totalPodcasts / Number(limit));
                res.status(200).json({ allPodcasts, totalPages });
                return;
            }
            res.status(200).json({ allPodcasts });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
)

/** Single podcast detail */

const getPodcastById = expressAsyncHandler(
    async (req, res) => {

        try {
            const { podcast_id } = req.query;

            if (!podcast_id) {
                return res.status(400).json({ message: 'Podcast id is required' });
            }

            const podcast = await Podcast.findById(podcast_id).
                populate('user_id', 'user_name Profile_image followers').
                populate('mentionedUsers', 'user_name user_handle Profile_image').
                populate('tags').
                lean().
                exec();


            if (!podcast) {
                return res.status(404).json({ message: 'Podcast not found' });
            }
            const commentCount = await Comment.countDocuments({
                podcastId: podcast_id,
                status: 'Active'
            });
            return res.status(200).json({ ...podcast, commentCount });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

/** Search podcast */

const searchPodcast = expressAsyncHandler(
    async (req, res) => {
        const { q, page = 1, limit = 100 } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        try {
            const skip = (Number(page) - 1) * parseInt(limit);

            const regex = new RegExp(q, 'i');
            // Find all article title matches with the rejex
            const matchingArticles = await Article.find({ title: regex , status: statusEnum.statusEnum.PUBLISHED}).select('_id title').lean().exec();
            const articleIds = matchingArticles.map(a => a._id);

            const matchPodcasts = await Podcast.
                find(
                    {
                        $or: [
                            { article_id: { $in: articleIds } },
                            { title: regex },
                            { description: regex },
                        ],
                        status: statusEnum.statusEnum.PUBLISHED
                    }
                )
                .select('_id title cover_image description article_id tags viewUsers duration')
                .populate('tags')
                .populate('article_id', 'title')
                .populate('user_id', 'user_name user_handle Profile_image')
                .sort({
                    updated_at: -1
                })
                .skip(skip)
                .limit(Number(limit))
                .lean();

            if (Number(page) === 1) {
                const totalPodcasts = await Podcast.countDocuments({
                    $or: [
                        { article_id: { $in: articleIds } },
                        { title: regex },
                        { description: regex },

                    ],
                    status: statusEnum.statusEnum.PUBLISHED
                });
                const totalPages = Math.ceil(totalPodcasts / Number(limit));
                res.status(200).json({ matchPodcasts, totalPages });
                return;
            }
            return res.status(200).json({matchPodcasts});

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

const filterPodcast = expressAsyncHandler(
    async (req, res) => {
        const { tags, sortType } = req.body;

        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: 'Invalid tags' });
        }
        try {

            const matchTagIds = tags
                .filter(mongoose.isValidObjectId)
                .map(id => mongoose.Types.ObjectId.createFromHexString(id));


            const query = {
                tags: { $in: matchTagIds },
                status: statusEnum.statusEnum.PUBLISHED,
            };
            const sort = {
                updated_at: sortType === 0 ? 1 : -1
            }
            const matchPodcasts = await Podcast.find(query)
                .select('_id title description article_id tags viewUsers duration')
                .populate('tags')
                .populate('article_id', 'title')
                .populate('user_id', 'user_name user_handle Profile_image')
                .sort(sort)
                .lean()
                .exec();


            return res.status(200).json(matchPodcasts);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

/** To create podcast */
const createPodcast = expressAsyncHandler(
    async (req, res) => {
        const { title, description, tags, article_id, audio_url, cover_image, duration } = req.body;

        if (!title || !description || !tags || !audio_url || !duration || !cover_image) {
            return res.status(400).json({ message: 'All fields are required: title, description, tags, audio_url, duration, cover_image' });
        }

        try {

            const user = await User.findById(req.userId);

            if (user.isBlockUser || user.isBannedUser) {
                return res.status(403).json({ error: "User is blocked or banned." });
            }
            const podcast = new Podcast({
                title,
                description,
                tags,
                article_id,
                audio_url,
                duration,
                user_id: user._id,
                cover_image,
            });

            podcast.mentionedUsers.push(user._id);

            await podcast.save();
            sendPodcastForReviewEmail(user.email, title);
            res.status(201).json({ message: 'Podcast created successfully.', podcast: podcast });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

// Save Podcast : (published podcast) (equivalent to add podcast to playlist)
const savePodcast = expressAsyncHandler(
    async (req, res) => {
        try {
            const { podcast_id } = req.body;

            if (!podcast_id) {
                return res.status(400).json({ message: "Podcast id required" });
            }
            const user = await User.findById(req.userId);
            const podcast = await Podcast.findById(podcast_id)
                .populate('tags')
                .exec();

            if (!user || !podcast || podcast.is_removed) {
                return res.status(404).json({ error: 'User or podcast not found' });
            }

            if (user.isBannedUser) {
                return res.status(403).json({ error: 'User is banned' });
            }

            if (podcast.status !== statusEnum.statusEnum.PUBLISHED) {
                return res.status(400).json({ message: 'Podcast is not published' });
            }

            const savedUserSet = new Set(podcast.savedUsers.map((id) => id.toString()));
            const isPodcastSaved = savedUserSet.has(req.userId);

            if (isPodcastSaved) {

                // unsave podcast
                await Podcast.findByIdAndUpdate(podcast_id, {
                    $pull: { savedUsers: user._id }
                });

                res.status(200).json({ message: 'Podcast unsaved' });
            }
            else {

                await Podcast.findByIdAndUpdate(podcast_id, {
                    $addToSet: { savedUsers: user._id }
                });

                res.status(200).json({ message: 'Podcast saved successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error saving podcast', details: error.message });
        }
    }
)

// Like Podcast (published podcast)
const likePodcast = expressAsyncHandler(
    async (req, res) => {
        try {
            const { podcast_id } = req.body;
            if (!podcast_id) {
                return res.status(400).json({ message: "Podcast id required" });
            }

            const user = await User.findById(req.userId);
            const podcast = await Podcast.findById(podcast_id);

            if (!user || !podcast || podcast.is_removed) {
                return res.status(404).json({ error: 'User or Article not found' });
            }

            if (user.isBlockUser || user.isBannedUser) {
                return res.status(403).json({ error: 'User is blocked or banned' });
            }

            if (podcast.status !== statusEnum.statusEnum.PUBLISHED) {
                return res.status(400).json({ message: 'Podcast is not published' });
            }
            // Check if the article is already liked
            const likedUserSet = new Set(podcast.likedUsers.map(u => u.toString()));
            const isUserLiked = likedUserSet.has(req.userId.toString());

            if (isUserLiked) {
                // Unlike It
                await Podcast.findByIdAndUpdate(podcast._id, {
                    $pull: { likedUsers: user._id } // Remove user from likedUsers
                });

                return res.status(200).json({
                    message: 'Podcast unliked successfully',
                    likeStatus: false
                });
            } else {

                await Podcast.findByIdAndUpdate(podcast._id, {
                    $addToSet: { likedUsers: user._id }
                });

                // Increase like contribution
                await updatePodcastLikeContribution(user._id);

                return res.status(200).json({
                    message: 'Podcast liked successfully',
                    likeStatus: true
                });
            }

        } catch (error) {
            res.status(500).json({ error: 'Error liking podcast', details: error.message });
        }
    }
)

// Update View Count (Published podcast)
const updatePodcastViewCount = expressAsyncHandler(
    async (req, res) => {
        const { podcast_id } = req.body;
        try {

            const user = await User.findById(req.userId);
            const podcast = await Podcast.findById(podcast_id);

            if (!user || !podcast || podcast.is_removed) {
                return res.status(404).json({ error: 'User or Article not found' });
            }

            if (user.isBlockUser || user.isBannedUser) {
                return res.status(403).json({ error: 'User is blocked or banned' });
            }

            if (podcast.status !== statusEnum.statusEnum.PUBLISHED) {
                return res.status(400).json({ message: 'Podcast is not published' });
            }

            // console.log('Podcast view users', podcast.viewUsers[0].toString());

            const viewUserSet = new Set(podcast.viewUsers.map(u => u.toString()));
            const isUserViewed = viewUserSet.has(req.userId.toString());
            //console.log("View User set", viewUserSet);
            //console.log("Req User Id", req.userId);
            //const hasViewed = podcast.viewUsers.some(id => id.toString() === req.userId);

            if (isUserViewed) {
                return res.status(200).json({ message: 'Podcast already viewed by user', data: podcast });
            }

            podcast.viewUsers.push(req.userId);

            await podcast.save();

            await updatePodcastViewContribution(req.userId);
            res.status(200).json({ message: 'Podcast view count updated', data: podcast });

        } catch (err) {
            res.status(500).json({ error: 'Error updating view', details: err.message });
        }
    }
)

// Create playlist

const createPlaylist = expressAsyncHandler(
    async (req, res) => {

        const { name, podcast_ids } = req.body;

        if (!name || !podcast_ids || podcast_ids.length === 0) {
            return res.status(400).json({ message: 'Invalid request: name, description, and podcast_ids are required' });
        }

        try {

            const playlist = await PlayList.create({
                title: name,
                podcasts: podcast_ids,
                user: req.userId,
            });

            return res.status(201).json({ message: 'Playlist created', data: playlist });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Error creating playlist', details: err.message });
        }
    }
)
// Add podcast into a playlist
const addPodcastToPlaylist = expressAsyncHandler(
    async (req, res) => {
        const { podcast_id, playlist_id } = req.body;

        if (!podcast_id || !playlist_id) {
            return res.status(400).json({ error: 'Podcast and Playlist IDs are required' });
        }

        try {

            const podcast = await Podcast.findById(podcast_id);
            const playlist = await PlayList.findById(playlist_id);

            if (!podcast || !playlist || podcast.is_removed) {
                return res.status(404).json({ error: 'Podcast or Playlist not found' });
            }
            if (!playlist.podcasts.includes(podcast._id)) {
                playlist.podcasts.push(podcast._id);
                playlist.updated_at = new Date();
                await playlist.save();
            }


            res.status(200).json({ message: 'Podcast added to playlist', data: playlist });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Error adding podcast to playlist', details: err.message });
        }
    }

);

/**
 * User will randomly select or uncheck all playlist,

Add to playlist always contains a list of playlist ids, with particular podcast id
Remove playlist always contains a list of playlist ids, with particular podcast id

Create playlist always contains a list of playlist ids, with particular podcast id, and the playlist name to create..

 */
const updatePlaylistwithPodcast = expressAsyncHandler(
    async (req, res) => {

        const { addPlaylistIds, removePlaylistIds, podcast_id, playlist_name } = req.body;

        if (!addPlaylistIds || !removePlaylistIds || !podcast_id) {
            res.status(400).json({ error: "Playlistids add or remove along with podcast id required" });
            return;
        }

        if (!Array.isArray(addPlaylistIds) || !Array.isArray(removePlaylistIds)) {
            res.status(400).json({ error: "Request format is invalid" });
            return;
        }

        try {
            const podcast = await Podcast.findById(podcast_id);
            if (!podcast || podcast.is_removed) {
                return res.status(404).json({ error: 'Podcast or Playlist not found' });
            }
            // First complete addition
            for (const id of addPlaylistIds) {
                const playlist = await PlayList.findById(id);
                if (playlist && playlist.user.toString() === req.userId && !playlist.podcasts.some(i => i.toString() === podcast_id)) {
                    playlist.podcasts.push(podcast_id);
                    playlist.updated_at = new Date();
                    await playlist.save();
                }
            }
            // Complete deletion
            for (const id of removePlaylistIds) {
                const playlist = await PlayList.findById(id);

                if (playlist && playlist.user.toString() === req.userId && playlist.podcasts.some(i => i.toString() === podcast_id)) {
                    playlist.podcasts = playlist.podcasts.filter((i) => i.toString() !== podcast_id);
                    playlist.updated_at = new Date();
                    await playlist.save();
                }
            }

            // If playlist creation

            if (playlist_name && playlist_name !== '') {
                const playlist = await PlayList.create({
                    title: playlist_name,
                    podcasts: [podcast_id],
                    user: req.userId,
                });

                return res.status(201).json({ message: 'Playlist created', data: playlist });
            }


            res.status(200).json({ message: 'Podcast added to playlist' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
)

// Remove podcast from a playlist
const removePodcastFromPlaylist = expressAsyncHandler(
    async (req, res) => {
        const { podcast_id, playlist_id } = req.body;

        if (!podcast_id || !playlist_id) {
            return res.status(400).json({ error: 'Podcast and Playlist IDs are required' });
        }

        try {
            const podcast = await Podcast.findById(podcast_id);
            const playlist = await PlayList.findById(playlist_id);

            if (!podcast || !playlist) {
                return res.status(404).json({ error: 'Podcast or Playlist not found' });
            }

            // Remove podcast from the playlist
            playlist.podcasts.pull(podcast._id);
            playlist.updated_at = new Date();
            await playlist.save();

            res.status(200).json({ message: 'Podcast removed from playlist', data: playlist });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error removing podcast from playlist', details: err.message });
        }
    }
);


async function updatePodcastLikeContribution(userId) {

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));

    try {

        const event = await AudioLikeAggregate.findOne({ userId: userId, date: today });

        if (!event) {
            const newEvent = new AudioLikeAggregate({
                userId: userId,
                date: today,
                dailyLikes: 1,
                monthlyLikes: 1,
                yearlyLikes: 1
            });

            await newEvent.save();
        } else {

            event.dailyLikes += 1;
            event.monthlyLikes += 1;
            event.yearlyLikes += 1;
            await event.save();
        }
    } catch (err) {
        console.log(err);
    }

}

async function updatePodcastViewContribution(userId) {

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));

    try {

        const user = await User.findById(userId);
        if (!user) {
            return;
        }
        const event = await AudioViewAggregate.findOne({ userId: user._id, date: today });

        if (!event) {
            const newEvent = new AudioViewAggregate({
                userId: userId,
                date: today,
                dailyViews: 1,
                monthlyViews: 1,
                yearlyViews: 1
            });

            await newEvent.save();
        } else {
            event.dailyViews += 1;
            event.monthlyViews += 1;
            event.yearlyViews += 1;
            await event.save();
        }
    } catch (err) {
        console.log(err);
    }

}

// Get analytics

// GET ALL LIKE EVENTS STATUS DAILY, WEEKLY, MONTHLY
// TODO: LOCATION ANALYSIS
const getPodcastLikeDataForGraphs = expressAsyncHandler(
    async (req, res) => {

        const userId = req.userId;

        try {
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const dailyData = await AudioLikeAggregate.findOne({ userId, date: today });
            const monthlyData = await AudioLikeAggregate.find({ userId, date: { $gte: monthStart } });
            const yearlyData = await AudioLikeAggregate.find({ userId, date: { $gte: yearStart } });

            res.status(200).json({
                dailyLikes: {
                    date: today.toISOString().slice(0, 10),
                    count: dailyData ? dailyData.dailyLikes : 0
                },
                monthlyLikes: monthlyData.map(entry => ({
                    date: entry.date.toISOString().slice(0, 10),
                    count: entry.monthlyLikes
                })),
                yearlyLikes: yearlyData.map(entry => ({
                    month: entry.date.toISOString().slice(0, 7),
                    count: entry.yearlyLikes
                })),
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching read data' });
        }
    }
)

// GET ALL VIEW EVENTS STATUS DAILY, WEEKLY, MONTHLY
// TODO: LOCATION ANALYSIS
// TODO: AVERAGE CALCULATION
const getPodcastViewDataForGraphs = expressAsyncHandler(
    async (req, res) => {

        const userId = req.userId;

        try {
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const dailyData = await AudioViewAggregate.findOne({ userId, date: today });
            const monthlyData = await AudioViewAggregate.find({ userId, date: { $gte: monthStart } });
            const yearlyData = await AudioViewAggregate.find({ userId, date: { $gte: yearStart } });

            res.status(200).json({
                dailyViews: {
                    date: today.toISOString().slice(0, 10),
                    count: dailyData ? dailyData.dailyViews : 0
                },
                monthlyViews: monthlyData.map(entry => ({
                    date: entry.date.toISOString().slice(0, 10),
                    count: entry.monthlyViews
                })),
                yearlyViews: yearlyData.map(entry => ({
                    month: entry.date.toISOString().slice(0, 7),
                    count: entry.yearlyViews
                })),
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching read data' });
        }
    }
)

// Update and delete action
// Update podcast
const updatePodcast = expressAsyncHandler(
    async (req, res) => {
        const { podcastId, name, cover_image } = req.body;

        if (!podcastId || !name) {
            return res.status(400).json({ error: 'Invalid request: podcastId and name are required' });
        }

        try {

            const podcast = await Podcast.findByIdAndUpdate(
                podcastId,
                { title: name, updated_at: new Date() },
                { new: true }
            );

            if (!podcast) {
                return res.status(404).json({ error: 'Podcast not found' });
            }
            if (cover_image) {
                // delete previous
                const coverParts = podcast.cover_image.split('/api/getFile/');
                if (coverParts.length >= 2) {
                    await deleteFileFn(coverParts[1]);
                }
                podcast.cover_image = cover_image;
                await podcast.save();
            }
            res.status(200).json({ message: 'Podcast updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while updating podcast' });
        }

    }

)

const updatePlaylist = expressAsyncHandler(
    async (req, res) => {
        const { playlistId, name } = req.body;

        if (!playlistId || !name) {
            return res.status(400).json({ error: 'Invalid request: playlistId and name are required' });
        }

        try {
            const playlist = await PlayList.findByIdAndUpdate(playlistId, { title: name, updated_at: Date.now() }, { new: true });
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist not found' });
            }
            res.status(200).json({ message: 'Playlist updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while updating podcast' });
        }

    }

)
// Delete Podcast
const deletePodcast = expressAsyncHandler(
    async (req, res) => {
        const { podcastId } = req.body;
        if (!podcastId) {
            return res.status(400).json({ error: 'Invalid request: podcastId is required' });
        }
        try {
            const podcast = await Podcast.findByIdAndDelete(podcastId);
            if (!podcast) {
                return res.status(404).json({ error: 'Podcast not found' });
            }
            // Delete audio url
            const parts = podcast.audio_url.split('/api/getFile/');
            const coverParts = podcast.cover_image.split('/api/getFile/');
            if (coverParts.length >= 2) {
                await deleteFileFn(coverParts[1]);
            }

            if (parts.length >= 2) {
                await deleteFileFn(parts[1]);
            }


            res.status(200).json({ message: 'Podcast deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while deleting podcast' });
        }
    }
)
// Delete Playlist

const deletePlaylist = expressAsyncHandler(
    async (req, res) => {
        const { playlistId } = req.body;
        if (!playlistId) {
            return res.status(400).json({ error: 'Invalid request: playlistId is required' });
        }
        try {
            const playlist = await PlayList.findByIdAndDelete(playlistId);
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist not found' });
            }

            res.status(200).json({ message: 'Playlist deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while deleting playlist' });
        }
    }
)

const getUserPendingPodcasts = expressAsyncHandler(
    async (req, res) => {
        try {
            const userId = req.userId;
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * parseInt(limit);

            const pendingPodcasts = await Podcast.find({
                user_id: userId,
                status: {
                    $in: ['review-pending', 'in-progress'],
                }
            }).populate('tags')
                .skip(skip)
                .limit(Number(limit))
                .exec();

            if (Number(page) === 1) {
                const totalPodcasts = await Podcast.countDocuments({
                    user_id: userId,
                    status: {
                        $in: ['review-pending', 'in-progress'],
                    }
                });
                const totalPages = Math.ceil(totalPodcasts / Number(limit));
                res.status(200).json({ pendingPodcasts, totalPages });
                return;
            }

            res.status(200).json({ pendingPodcasts });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

const getUserPublishedPodcasts = expressAsyncHandler(
    async (req, res) => {
        try {
            const userId = req.userId;
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * parseInt(limit);

            const publishedPodcasts = await Podcast.find({
                user_id: userId,
                status: 'published'
            }).populate('tags').sort({ updated_at: -1 })
                .skip(skip)
                .limit(Number(limit))
                .exec();

            if (Number(page) === 1) {
                const totalPodcasts = await Podcast.countDocuments({
                    user_id: userId,
                    status: 'published'
                });
                const totalPages = Math.ceil(totalPodcasts / Number(limit));
                res.status(200).json({ publishedPodcasts, totalPages });
                return;
            }

            res.status(200).json({ publishedPodcasts });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

const getDiscardedPodcasts = expressAsyncHandler(
    async (req, res) => {
        try {
            const userId = req.userId;
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * parseInt(limit);

            const discardedPodcasts = await Podcast.find({
                user_id: userId,
                status: 'discarded'
            }).populate('tags').sort({ updated_at: -1 })
                .skip(skip)
                .limit(Number(limit))
                .exec();

            if (Number(page) === 1) {
                const totalPodcasts = await Podcast.countDocuments({
                    user_id: userId,
                    status: 'discarded'
                });
                const totalPages = Math.ceil(totalPodcasts / Number(limit));
                res.status(200).json({ discardedPodcasts, totalPages });
                return;
            }

            res.status(200).json({ discardedPodcasts });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

module.exports = {
    getPodcastProfile,
    getFollowingsPodcasts,
    getMyPlayLists,
    getAllPublishedPodcasts,
    getPodcastsByPlaylistId,
    getPodcastById,
    searchPodcast,
    filterPodcast,

    // post
    createPodcast,
    savePodcast,
    likePodcast,
    updatePodcastViewCount,
    getPodcastViewDataForGraphs,
    getPodcastLikeDataForGraphs,

    // Playlist
    addPodcastToPlaylist,
    createPlaylist,
    removePodcastFromPlaylist,

    // Update
    updatePlaylist,
    updatePodcast,

    // Delete
    deletePodcast,
    deletePlaylist,
    updatePlaylistwithPodcast,
    getUserPendingPodcasts,
    getUserPublishedPodcasts,
    getDiscardedPodcasts
}
