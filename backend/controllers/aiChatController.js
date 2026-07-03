const { GoogleGenerativeAI } = require("@google/generative-ai");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require('dotenv');

const User = require('../models/UserModel');
const Conversation = require('../models/ai/Conversation');
const Message = require('../models/ai/Message');

dotenv.config();

const PPLX_URL = "https://api.perplexity.ai/chat/completions";
const MODEL = "sonar-pro";

const MAX_DAY_LIMIT = 5;

// Fallback across 5 API keys for robustness
const geminiKeys = [
    process.env.GEMINI_API_KEY_1 || process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
    process.env.GEMINI_API_KEY_5
].filter(Boolean);

// Character configurations
const characterPrompts = {
    general: "You are the official personalized health assistant for UltimateHealth. Provide concise, actionable personal health suggestion tips. Keep your answers short and friendly.",
    fitness_coach: "You are an expert Fitness Coach for UltimateHealth. Motivate the user, provide workout tips, and focus on physical fitness, strength, and endurance. Keep answers energetic and actionable.",
    nutritionist: "You are a professional Nutritionist for UltimateHealth. Provide dietary advice, healthy recipes, and tips for balanced eating. Do not provide medical diagnoses. Keep answers concise.",
    mental_wellness: "You are a Mental Wellness Guide for UltimateHealth. Provide calming, supportive advice on stress management, mindfulness, and mental well-being. Keep answers empathetic and soothing."
};

const startConversation = expressAsyncHandler(
    async (req, res) => {
        try {
            const userId = req.userId;
            const { text, character = 'general' } = req.body;

            if (!text) {
                return res.status(400).json({ message: "Text is required" });
            }

            let user = await User.findById(userId);

            // Find or create conversation for the specific character
            let conv = await Conversation.findOne({ userId, characterName: character });
            if (!conv) {
                conv = await Conversation.create({ userId, characterName: character });
            }
            const conversationId = conv._id;

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            
            let messages = await Message.find({
                conversationId: conversationId,
                role: 'model',
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            });

            if (messages.length >= MAX_DAY_LIMIT) {
                return res.status(429).json({
                    success: false,
                    error: "Daily quota exceeded for this character",
                    remaining: 0
                });
            }

            // Save user message
            await Message.create({
                role: "user",
                text,
                conversationId
            });

            const history = await Message.find({ conversationId }).sort({ _id: 1 });

            // Generate assistant reply via Gemini with key rotation
            const reply = await generateReplyWithRotation(history, character);

            // Save assistant message
            const newMsg = await Message.create({
                role: "model",
                text: reply,
                conversationId
            });

            return res.status(200).json({
                success: true,
                message: newMsg
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
        }
    }
);

async function generateReplyWithRotation(history, character) {
    const formattedMessages = history.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
    }));

    const systemInstruction = characterPrompts[character] || characterPrompts['general'];

    for (let i = 0; i < geminiKeys.length; i++) {
        try {
            const genAI = new GoogleGenerativeAI(geminiKeys[i]);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                systemInstruction: systemInstruction 
            });
            
            const chat = model.startChat({
                history: formattedMessages
            });

            const result = await chat.sendMessage("Continue the conversation");
            return result.response.text();
        } catch (err) {
            console.error(`Gemini key ${i+1} failed:`, err.message);
            // If it's the last key, throw the error
            if (i === geminiKeys.length - 1) {
                throw new Error("All AI API keys exhausted or rate limited.");
            }
        }
    }
}

const startPPLXConversation = expressAsyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const { text, character = 'general' } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        let user = await User.findById(userId);

        let conv = await Conversation.findOne({ userId, characterName: character });
        if (!conv) {
            conv = await Conversation.create({ userId, characterName: character });
        }
        const conversationId = conv._id;

        // Daily limit check
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        let modelMessagesToday = await Message.find({
            conversationId,
            role: "model",
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        if (modelMessagesToday.length >= MAX_DAY_LIMIT) {
            return res.status(429).json({
                success: false,
                error: "Daily quota exceeded for this character",
                remaining: 0
            });
        }

        await Message.create({
            role: "user",
            text,
            conversationId
        });

        const history = await Message.find({ conversationId }).sort({ _id: 1 });

        const reply = await generatePPLXReply(history, character);

        const newMsg = await Message.create({
            role: "model",
            text: reply,
            conversationId
        });

        return res.status(200).json({
            success: true,
            message: newMsg
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

async function generatePPLXReply(history, character) {
    let messages = history.map(m => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text
    }));

    const cleaned = [];
    for (let i = 0; i < messages.length; i++) {
        if (i === 0 || messages[i].role !== messages[i - 1].role) {
            cleaned.push(messages[i]);
        }
    }

    if (cleaned[cleaned.length - 1].role !== "user") {
        cleaned.push({
            role: "user",
            content: "Continue our conversation."
        });
    }

    const systemInstruction = characterPrompts[character] || characterPrompts['general'];
    cleaned.unshift({
        role: "system",
        content: systemInstruction
    });

    const response = await fetch(PPLX_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.PPLX_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: MODEL,
            messages: cleaned
        })
    });

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "Unable to generate response.";
}

const loadConversations = expressAsyncHandler(
    async (req, res) => {
        try {
            const userId = req.userId;
            const character = req.query.character || 'general';

            const user = await User.findById(userId);

            const conv = await Conversation.findOne({ userId, characterName: character });
            if (!conv) {
                return res.status(200).json({ messages: [] });
            }

            const messages = await Message.find({
                conversationId: conv._id
            });

            const enhancedMessages = messages.map(msg => {
                const m = msg.toObject();
                if (m.role === "user") {
                    m.userHandle = user.user_handle;       
                    m.profileImage = user.Profile_image;   
                }
                return m;
            });

            res.json({ success: true, messages: enhancedMessages });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
);

const getCharacters = expressAsyncHandler(async (req, res) => {
    const characters = [
        {
            id: 'general',
            name: 'UltimateHealth Assistant',
            tagline: 'Your personal health suggestion guide',
            avatarUrl: 'https://ui-avatars.com/api/?name=Health+Assistant&background=0D8ABC&color=fff'
        },
        {
            id: 'fitness_coach',
            name: 'Coach Alex',
            tagline: 'Expert in physical fitness, strength, and endurance',
            avatarUrl: 'https://ui-avatars.com/api/?name=Coach+Alex&background=FF5722&color=fff'
        },
        {
            id: 'nutritionist',
            name: 'Dr. Sarah',
            tagline: 'Professional Nutritionist for dietary advice',
            avatarUrl: 'https://ui-avatars.com/api/?name=Dr+Sarah&background=4CAF50&color=fff'
        },
        {
            id: 'mental_wellness',
            name: 'Guide Maya',
            tagline: 'Mental Wellness Guide for stress and mindfulness',
            avatarUrl: 'https://ui-avatars.com/api/?name=Guide+Maya&background=9C27B0&color=fff'
        }
    ];

    res.json({ success: true, characters });
});

module.exports = {
    startConversation,
    loadConversations,
    startPPLXConversation,
    getCharacters,
};
