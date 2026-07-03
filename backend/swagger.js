
const swaggerJsdoc = require('swagger-jsdoc');
const port = process.env.PORT | 8080;
const url = process.env.PROD_URL;


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation- UltimateHealth',
      version: '3.2.0',
    },

    servers: [{ url: `${url}/api` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {

        /***************Admin  ******************/
        Admin: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345",
            },
            user_name: { type: "string", example: "John Doe" },
            user_handle: { type: "string", example: "johndoe123" },
            email: { type: "string", format: "email", example: "john@example.com" },
            otp: { type: "string", example: "123456", nullable: true },
            otpExpires: { type: "string", format: "date-time", example: "2025-08-28T10:00:00Z", nullable: true },
            password: { type: "string", example: "StrongPass@123" },
            role: { type: "string", enum: ["Super Admin", "Moderator"], example: "Moderator" },
            created_at: { type: "string", format: "date-time", example: "2025-08-28T10:00:00Z" },
            updated_at: { type: "string", format: "date-time", example: "2025-08-28T10:00:00Z" },
            Profile_avtar: { type: "string", example: "https://cdn.example.com/avatar.png" },
            isVerified: { type: "boolean", example: false },
            verificationToken: { type: "string", example: "eyJhbGciOiJIUzI1Ni...", nullable: true },
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1Ni...", nullable: true },
            fcmToken: { type: "string", example: "d4hfgdhs7sd78sd7f7sdf8sdf8sd7f", nullable: true }
          },
          required: ["user_name", "user_handle", "email", "password", "role"]
        },

        /**** User*************************/
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64ea2f9c4a3f9c6b8b1d2346" },
            user_name: { type: "string", example: "John Doe" },
            user_handle: { type: "string", example: "johndoe01" },
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "hashedpassword123" },
            isDoctor: { type: "boolean", example: false },
            specialization: { type: "string", nullable: true },
            qualification: { type: "string", nullable: true },
            about: { type: "string", nullable: true },
            Years_of_experience: { type: "number", nullable: true }, // later purpose
            contact_detail: {
              type: "object",
              properties: {
                phone_no: { type: "string", nullable: true },
                email_id: { type: "string", nullable: true }
              }
            }, // later purpose,
            Profile_image: { type: "string", example: "" },
            otp: { type: "string", nullable: true },
            otpExpires: { type: "string", format: "date-time", nullable: true },
            created_at: { type: "string", format: "date-time" },
            last_updated_at: { type: "string", format: "date-time" },
            isVerified: { type: "boolean", example: false },
            verificationToken: { type: "string", nullable: true },
            refreshToken: { type: "string", nullable: true },
            fcmToken: { type: "string", nullable: true },
            articles: {
              type: "array",
              items: { $ref: "#/components/schemas/Article" },
              description: "List of articles user has published in this platform"
            },
            repostArticles: {
              type: "array",
              items: { $ref: "#/components/schemas/Article" },
              description: "List of articles the user has reposted."
            },
            savedArticles: {
              type: "array",
              items: { $ref: "#/components/schemas/Article" },
              description: "List of articles the user has saved."
            },
            likedArticles: {
              type: "array",
              items: { $ref: "#/components/schemas/Article" }
            },
            improvements: {
              type: "array",
              items: { $ref: "#/components/schemas/Article" },
              description: "List of articles the user has improved and published."
            },
            followers: { type: "array", items: { $ref: "#/components/schemas/User" } },
            followings: { type: "array", items: { $ref: "#/components/schemas/User" } },
            followerCount: { type: "number", example: 100 },
            followingCount: { type: "number", example: 50 },
            activeReportCount: {
              type: "number",
              example: 2,
              description: "Number of active reports against the user"
            },
            isBannedUser: { type: "boolean", example: false },
            isBlockUser: { type: "boolean", example: false },
            reportFeatureMisuse: {
              type: "number",
              example: 0,
              description: "Number of times the user has misused the report feature"
            },
            strikeCount: {
              type: "number",
              example: 0,
              description: "Number of strikes against the user for policy violations"
            },
            blockedAt: { type: "string", format: "date-time", nullable: true }
          },
          required: ["user_name", "user_handle", "email", "password", "isDoctor"]
        },


        /***************************  Article-Tag ***************************************************/
        ArticleTag: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 101,
              description: "Unique identifier for the article tag"
            },
            name: {
              type: "string",
              example: "Health",
              description: "Name of the tag"
            }
          },
          required: ["id", "name"]
        },

        /***************************  Article ***************************************************/
        Article: {
          type: "object",
          properties: {
            _id: { type: "number", example: 101 },
            pb_recordId: {
              type: "string",
              description: "Pocketbase record id of the article",
              nullable: true,
            },
            title: { type: "string" },
            description: { type: "string" },
            authorName: { type: "string" },
            authorId: { $ref: "#/components/schemas/User", description: "Author of the article" },
            contributors: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
              description: "The list of users contributed or later improve this article."
            },
            content: { type: "string", description: "File url of the content" },
            summary: { type: "string", nullable: true },
            publishedDate: { type: "string", format: "date-time" },
            lastUpdated: { type: "string", format: "date-time" },
            tags: { type: "array", items: { $ref: "#/components/schemas/ArticleTag" } },
            imageUtils: { type: "array", items: { type: "string" } },
            viewCount: { type: "number" },
            likeCount: { type: "number" },
            language: { type: "string" },
            isTranslation: {
              type: "boolean",
              description: "Whether this article is a translated version of another article"
            },
            sourceArticleId: {
              type: "number",
              nullable: true,
              description: "Source article ID for translated articles"
            },
            sourceArticleRecordId: {
              type: "string",
              nullable: true,
              description: "Pocketbase record ID of the source article"
            },
            sourceLanguage: {
              type: "string",
              nullable: true,
              description: "Language code of the source article"
            },
            translationOf: {
              type: "number",
              nullable: true,
              description: "Article ID this translation belongs to"
            },
            translatedArticles: {
              type: "array",
              items: { $ref: "#/components/schemas/Article" },
              description: "Published translation articles linked to this article"
            },
            adminPost: { type: "boolean" },
            likedUsers: { type: "array", items: { $ref: "#/components/schemas/User" } },
            repostUsers: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
              description: "The list of users reposted this article"
            },
            savedUsers: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
              description: "The list of users saved this article"
            },
            viewUsers: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
              description: "The list of users view this article"
            },
            mentionedUsers: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
              description: "The list of users mentioned and participated in the article related discussion"
            },
            status: { type: "string", enum: ['unassigned', 'in-progress', 'review-pending', 'published', 'discarded', 'awaiting-user'] },
            assigned_date: { type: "string", format: "date-time", nullable: true },
            reviewer_id: { $ref: "#/components/schemas/Admin", nullable: true },
            review_comments: { type: "array", items: { $ref: "#/components/schemas/Comment" } },
            discardReason: { type: "string" },
            is_removed: { type: "boolean" },
            reportId: { $ref: "#/components/schemas/ReportAction", nullable: true },
            allow_for_podcast: { type: "boolean" }
          },
          required: ["title", "authorName", "authorId", "content", "publishedDate", "lastUpdated", "imageUtils", "viewCount", "likeCount", "language"]
        },

        Language: {
          type: "object",
          properties: {
            name: { type: "string" },
            code: { type: "string" },
          },
          required: ["name", "code",]
        },

        /***************************  Improvement Request ***************************************************/
        EditRequest: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            pb_recordId: {
              type: "string",
              example: "PB123456",
              description: "PocketBase Record ID of the improvement",
              nullable: true
            },
            article_recordId: {
              type: "string",
              example: "ART987654",
              description: "PocketBase Record ID of the article",
              nullable: true
            },
            user_id: {
              $ref: "#/components/schemas/User",
              description: "User who requested the edit"
            },
            article: {
              $ref: "#/components/schemas/Article",
              description: "Reference to the Article schema"
            },
            edit_reason: {
              type: "string",
              example: "Correct factual error in paragraph 2"
            },
            status: {
              type: "string",
              enum: ['unassigned', 'in-progress', 'review-pending', 'published', 'discarded', 'awaiting-user'],
              example: "unassigned"
            },
            reviewer_id: {
              $ref: "#/components/schemas/Admin",
              description: "Admin who is reviewing the edit",
              nullable: true
            },
            edited_content: {
              type: "string",
              example: "Updated paragraph with corrected data",
              nullable: true
            },
            imageUtils: {
              type: "array",
              items: { type: "string" },
              example: ["https://cdn.example.com/image1.png", "https://cdn.example.com/image2.png"]
            },
            editComments: {
              type: "array",
              items: { $ref: "#/components/schemas/Comment" },
            },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z"
            },
            discardReason: {
              type: "string",
              example: "Discarded by system"
            },
            last_updated: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T12:00:00Z"
            }
          },
          required: ["user_id", "article", "edit_reason", "imageUtils"]
        },

        /************************************Podcast ********************************************/
        Podcast: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user_id: { $ref: "#/components/schemas/User" },
            article_id: {
              $ref: "#/components/schemas/Article",
              nullable: true,
              description: "The article based on which this podcast is created. Null if it's a standalone podcast."
            },
            title: { type: "string", description: "Title of the podcast" },
            description: { type: "string" },
            audio_url: { type: "string" },
            cover_image: { type: "string" },
            duration: { type: "number" },
            tags: { type: "array", items: { $ref: "#/components/schemas/ArticleTag" } },
            likedUsers: { type: "array", items: { $ref: "#/components/schemas/User" } },
            savedUsers: { type: "array", items: { $ref: "#/components/schemas/User" } },
            viewUsers: { type: "array", items: { $ref: "#/components/schemas/User" } },
            discardReason: { type: "string" },
            is_removed: { type: "boolean" },
            mentionedUsers: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
              description: "The list of users mentioned and participated in the podcast related discussion"
            },
            reportId: { $ref: "#/components/schemas/ReportAction", nullable: true },
            status: { type: "string", enum: ["in-progress", "review-pending", "published", "discarded"] },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            admin_id: { $ref: "#/components/schemas/Admin", nullable: true }
          },
          required: ["user_id", "title", "description", "audio_url", "cover_image", "duration"]
        },
        /*****************************************Playlist **************************/
        Playlist: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: {
              type: 'string',
              example: "Top AI Podcasts"
            },
            user: {
              type: "object",
              $ref: "#/components/schemas/User",
              description: "ID of the user who created the playlist",
              example: "64f8a7c23fcd1a0012ef4567"
            },
            podcasts: {
              type: "array",
              items: {
                type: "object",
                description: "ID of a podcast included in the playlist.",
                $ref: "#/components/schemas/Podcast"
              }
            },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2025-08-30T14:45:00.000Z"
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2025-08-31T10:12:00.000Z"
            }
          }
        },
        /*******************Comment ******************************************/
        Comment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            articleId: {
              $ref: "#/components/schemas/Article",
              nullable: true,
              description: "Reference to the Article schema if the discussion is on an article"
            },
            podcastId: {
              $ref: "#/components/schemas/Podcast",
              nullable: true,
              description: "Reference to the Podcast schema if the discussion is on a podcast"
            },
            userId: { $ref: "#/components/schemas/User", nullable: true },
            adminId: { $ref: "#/components/schemas/Admin", nullable: true },
            content: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            parentCommentId: { $ref: "#/components/schemas/Comment", nullable: true },
            replies: { type: "array", items: { $ref: "#/components/schemas/Comment" } },
            likedUsers: { type: "array", items: { $ref: "#/components/schemas/User" } },
            status: { type: "string", enum: ["Active", "Deleted"] },
            isEdited: { type: "boolean" },
            isReview: { type: "boolean" },
            isNote: { type: "boolean" },
            is_removed: { type: "boolean" }
          },
          required: ["content"]
        },

        /**********************************Report Reason *************************************/
        Reason: {
          type: "object",
          properties: {
            _id: { type: "string" },
            reason: { type: "string" },
            status: { type: "string", enum: ["Active", "Archive"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          },
          required: ["reason"]
        },

        /***************************  Report action ***************************************************/
        ReportAction: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            admin_id: {
              $ref: "#/components/schemas/Admin",
              description: "Admin who took action",
              nullable: true
            },
            action_taken: {
              type: "string",
              enum: [
                "Pending",
                "Resolved",
                "Dismissed",
                "User Warned",
                "Content Removed",
                "Content Edited",
                "Content Restored",
                "User Blocked",
                "User Banned",
                "Escalated",
                "Investigation Start",
                "Ignored",
                "CONVICT_REQUEST_TO_RESTORE_CONTENT",
                "CONVICT_REQUEST_DISAPPROVED"
              ],
              example: "Pending"
            },
            articleId: {
              $ref: "#/components/schemas/Article",
              description: "Reference to the Article schema",
              nullable: true
            },
            podcastId: {
              $ref: "#/components/schemas/Podcast",
              description: "Reference to the Podcast schema",
              nullable: true
            },
            commentId: {
              $ref: "#/components/schemas/Comment",
              description: "Reference to the Comment schema",
              nullable: true
            },
            reportedBy: { $ref: "#/components/schemas/User", description: "User who reported" },
            convictId: { $ref: "#/components/schemas/User", description: "User who is being reported" },
            reasonId: { $ref: "#/components/schemas/Reason", description: "Reason for reporting" },
            last_action_date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T12:00:00Z"
            },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z"
            },
            convict_statement: {
              type: "string",
              example: "I disagree with the report",
              nullable: true
            }
          },
          required: ["action_taken", "reportedBy", "convictId", "reasonId"]
        },

        /***************************  Admin contribution analytics ***************************************************/
        AdminAggregate: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            userId: { $ref: "#/components/schemas/Admin" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z"
            },
            contributionType: {
              type: "number",
              description: "1 -> Article Publish Event, 2 -> Existing Article Edit Request, 3 -> Report User, 4 -> Podcast Contribution",
              example: 1
            },
            day: {
              type: "string",
              example: "2025-08-28",
              description: "Date in YYYY-MM-DD format"
            },
            month: {
              type: "string",
              example: "2025-08",
              description: "Month in YYYY-MM format"
            }
          },
          required: ["userId", "date", "contributionType", "day", "month"]
        },

        /***************************  Podcast Like event analytics ***************************************************/
        AudioLikeAggregate: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            userId: { $ref: "#/components/schemas/User", description: "Author of the audio" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z"
            },
            dailyLikes: {
              type: "number",
              example: 15,
              description: "Number of likes received on this audio today"
            },
            monthlyLikes: {
              type: "number",
              example: 120,
              description: "Total likes received in this month"
            },
            yearlyLikes: {
              type: "number",
              example: 1350,
              description: "Total likes received in this year"
            }
          },
          required: ["userId", "date"]
        },

        /***************************  Podcast view analytics ***************************************************/
        AudioViewAggregate: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            userId: { $ref: "#/components/schemas/User", description: "Author of the audio" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z"
            },
            dailyViews: {
              type: "number",
              example: 45,
              description: "Number of views received on this audio today"
            },
            monthlyViews: {
              type: "number",
              example: 320,
              description: "Total views received in this month"
            },
            yearlyViews: {
              type: "number",
              example: 3800,
              description: "Total views received in this year"
            }
          },
          required: ["userId", "date"]
        },
        /***************************  Podcast publish analytics ***************************************************/
        AudioWriteAggregate: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            userId: {
              $ref: "#/components/schemas/User",
              description: "Author of the audio"
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z"
            },
            monthlyUploads: {
              type: "number",
              example: 12,
              description: "Number of audios uploaded in the month"
            },
            yearlyUploads: {
              type: "number",
              example: 140,
              description: "Number of audios uploaded in the year"
            }
          },
          required: ["userId", "date"]
        },

        /***************************  Article read analytics for user ***************************************************/
        ReadAggregate: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            userId: { $ref: "#/components/schemas/User", description: "User who read the article" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z",
              description: "Date of the read aggregation"
            },
            dailyReads: {
              type: "number",
              example: 7,
              description: "Number of articles read by the user today"
            },
            monthlyReads: {
              type: "number",
              example: 55,
              description: "Total articles read by the user in the current month"
            },
            yearlyReads: {
              type: "number",
              example: 620,
              description: "Total articles read by the user in the current year"
            }
          },
          required: ["userId", "date"]
        },

        /***************************  Article write analytics for user ***************************************************/

        WriteAggregate: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64ea2f9c4a3f9c6b8b1d2345"
            },
            userId: { $ref: "#/components/schemas/User", description: "User who wrote the article" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-28T10:00:00Z",
              description: "Date of the write aggregation"
            },
            dailyWrites: {
              type: "number",
              example: 3,
              description: "Number of articles written by the user today"
            },
            monthlyWrites: {
              type: "number",
              example: 25,
              description: "Total articles written by the user in the current month"
            },
            yearlyWrites: {
              type: "number",
              example: 300,
              description: "Total articles written by the user in the current year"
            }
          },
          required: ["userId", "date"]
        },

        /*******************************Notification Schema***********************************************************/
        Notification: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64ea2f9c4a3f9c6b8b1d2346" },
            userId: { $ref: "#/components/schemas/User", nullable: true, description: "User associated with the notification" },
            adminId: { $ref: "#/components/schemas/Admin", nullable: true, description: "Admin associated with the notification" },
            articleId: { $ref: "#/components/schemas/Article", nullable: true, description: "Article related to the notification" },
            revisionId: { $ref: "#/components/schemas/EditRequest", nullable: true, description: "EditRequest related to the notification" },
            podcastId: { $ref: "#/components/schemas/Podcast", nullable: true, description: "Podcast related to the notification" },
            commentId: { $ref: "#/components/schemas/Comment", nullable: true, description: "Comment related to the notification" },
            articleRecordId: { type: "string", nullable: true },
            type: {
              type: "string",
              enum: [
                'articleReview',
                'podcastReview',
                'podcastCommentMention',
                'articleCommentMention',
                'articleRepost',
                'userFollow',
                'commentLike',
                'comment',
                'article',
                'podcast',
                'editRequest',
                'articleLike',
                'podcastLike',
                'articleImprovement',
                'articleComment',
                'podcastComment',
                'editRequestComment',
                'articleCommentLike',
                'podcastCommentLike',
                'articleRevisionReview',
                'articleSubmitToAdmin',
                'revisionSubmitToAdmin'
              ]
            },
            title: { type: "string", example: "New Article Published" },
            message: { type: "string", example: "An article you follow has been published." },
            read: { type: "boolean", example: false },
            timestamp: { type: "string", format: "date-time", example: "2025-08-28T10:00:00Z" }
          },
          required: ["type", "title", "message"]
        },

        /************************** AI WORK ***************************************************/
        Conversation: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" }
          }
        },
        Message: {
          type: "object",
          properties: {
            _id: { type: "number" },
            role: { type: "string", enum: ["user", "assistant"] },
            text: { type: "string" },
            conversationId: { type: "string" },
            timestamp: { type: "number" }
          }
        },


        AdminLoginRequest: {
          type: "object",
          required: ["email", "password", "fcmToken"],
          properties: {
            email: { type: "string", example: "admin@example.com" },
            password: { type: "string", example: "Admin@123" },
            fcmToken: { type: "string", example: "d4hfgdhs7sd78sd7f7sdf8sdf8sd7f" }
          }
        },
        AdminLoginResponse: {
          type: "object",
          properties: {
            user: {
              type: "object",
              example: { _id: "", user_name: "Admin User" }
            },
            accessToken: { type: "string", example: "eyJhbGciOiJIUzI1Ni..." },
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1Ni..." },
            message: { type: "string", example: "Login Successful" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Some error message" }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};


module.exports = swaggerJsdoc(options);
