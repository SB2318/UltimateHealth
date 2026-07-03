

const expressAsyncHandler = require("express-async-handler");
const Article = require("../models/Articles");
const Podcast = require("../models/Podcast");
const { statusEnum } = require("../utils/StatusEnum");
const { getHTMLFileContent } = require('../utils/pocketbaseUtil');
const moment = require("moment");

module.exports.shareArticle = expressAsyncHandler(async (req, res) => {
  const { articleId, authorId, recordId } = req.query;

  if (!articleId) {
    return res.status(400).json({ message: "Article ID is required" });
  }

  try {

    const article = await Article.findById(articleId);

    if (!article || article.status !== statusEnum.PUBLISHED) {
      return res.status(404).json({ message: "Article not found" });
    }
    const dynamicLink = `https://uhsocial.in/api/share/article?articleId=${article._id}&authorId=${authorId}&recordId=${recordId}`;

    const htmlContent = generateProfessionalHTML(article, dynamicLink);
    res.setHeader("Content-Type", "text/html");
    res.send(htmlContent);
  } catch (error) {
    console.error("Error sharing article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.sharePodcast = expressAsyncHandler(async (req, res) => {
  const { trackId, audioUrl } = req.query;

  if (!trackId) {
    return res.status(400).json({ message: "Track ID is required" });
  }

  try {

    const podcast = await Podcast.findById(trackId);

    if (!podcast || podcast.status !== statusEnum.PUBLISHED) {
      return res.status(404).json({ message: "Podcast not found" });
    }
    const dynamicLink = `https://uhsocial.in/api/share/podcast?trackId=${podcast._id}&audioUrl=${audioUrl}`;

    const htmlContent = generatePodcastHTML(podcast, dynamicLink);
    res.setHeader("Content-Type", "text/html");
    res.send(htmlContent);
  } catch (error) {
    console.error("Error sharing podcast:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.generateBlogPage = expressAsyncHandler(async (req, res) => {

  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ message: "Slug is required" });
  }

  try {

    const article = await Article.findOne({ pb_recordId: slug }).populate("authorId", "Profile_image user_name").populate("tags", "name").exec();

    if (!article || article.status !== statusEnum.PUBLISHED || article.isRemoved) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.viewCount += 1;
    await article.save();
    const profileImageUrl = article.authorId.Profile_image && article.authorId.Profile_image.startsWith("https") ? article.authorId.Profile_image : `https://uhsocial.in/api/getfile/${article.authorId.Profile_image}`;
    const bannerImageUrl = article.imageUtils.length > 0 && article.imageUtils[0].startsWith("https") ? article.imageUtils[0] : `https://uhsocial.in/api/getfile/${article.imageUtils[0]}`;
    const htmlRes = await getHTMLFileContent("content", slug);

    const htmlContent = generateBlogContent(htmlRes.htmlContent, article, profileImageUrl, bannerImageUrl);

    res.setHeader("Content-Type", "text/html");
    res.send(htmlContent);
  } catch (error) {
    console.error("Error generating blog page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


function generateBlogContent(htmlContent, article, profileImageUrl, bannerImageUrl) {

  const tagBadges = article.tags?.length
  ? article.tags.map(tag =>
      `<span class="category-badge">${tag.name}</span>`
    ).join("")
  : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${article.title} | UltimateHealth</title>
<meta name="description" content="${article.title}" />

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<style>

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #1e293b;
}

/* HERO SECTION */
.hero {
  position: relative;
  height: 480px;
  width: 100%;
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(60%);
}

.hero-content {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 900px;
  width: 90%;
  color: white;
}

.category-wrapper {
  margin-bottom: 20px;
}

.category-badge {
  display: inline-block;
  background: rgba(0, 168, 232, 0.9);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 8px;
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: 46px;
  line-height: 1.2;
  margin: 0 0 20px 0;
}

.meta {
  font-size: 15px;
  opacity: 0.9;
}

/* ARTICLE BODY */
.article-container {
  max-width: 800px;
  margin: -80px auto 80px auto;
  background: #ffffff;
  padding: 60px;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.08);
  position: relative;
  z-index: 10;
}

.view-counter {
  position: absolute;
  top: -20px;
  right: 40px;
  background: #ffffff;
  padding: 10px 18px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.article-content {
  font-size: 18px;
  line-height: 1.9;
  color: #374151;
}

.article-content h2 {
  font-family: 'Playfair Display', serif;
  margin-top: 50px;
  font-size: 28px;
  color: #0f172a;
}

.article-content p {
  margin-bottom: 24px;
}

/* CONTRIBUTOR */
.author-section {
  margin-top: 80px;
  padding-top: 50px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.author-img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h4 {
  margin: 0 0 6px 0;
  font-size: 20px;
}

.author-info p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

/* CTA */
.cta-box {
  margin-top: 80px;
  padding: 50px;
  border-radius: 16px;
  background: linear-gradient(135deg, #00698f, #00a8e8);
  color: white;
  text-align: center;
}

.cta-box h3 {
  font-size: 26px;
  margin-bottom: 15px;
}

.cta-box p {
  font-size: 16px;
  margin-bottom: 25px;
  opacity: 0.95;
}

.btn {
  display: inline-block;
  padding: 14px 28px;
  background: white;
  color: #00698f;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
}

/* FOOTER COPYRIGHT */
.footer {
  margin-top: 60px;
  text-align: center;
  font-size: 14px;
  color: #94a3b8;
}

@media(max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }
  .article-container {
    padding: 30px;
  }
}

</style>
</head>

<body>

<!-- HERO -->
<section class="hero">
  <img src="${bannerImageUrl}" alt="Banner">
  <div class="hero-content">
   
  <h1>${article.title}</h1>
  <div class="category-wrapper">
   ${tagBadges}
   </div>
    <div class="meta">
      Published on ${moment(article.lastUpdated).format("MMMM D, YYYY")}
    </div>
  </div>
</section>

<!-- ARTICLE BODY -->
<div class="article-container">

  <div class="view-counter">
    👁 ${formatViewCount(article.viewCount)} views
  </div>

  <div class="article-content">
    ${htmlContent}
  </div>

  <!-- AUTHOR -->
  <div class="author-section">
    <img src="${profileImageUrl}" alt="${article.authorId.user_name}" class="author-img">
    <div class="author-info">
      <h4>${article.authorId.user_name}</h4>
      <p>Health Contributor at UltimateHealth</p>
    </div>
  </div>

  <!-- CTA -->
  <div class="cta-box">
    <h3>Read Full Article in UltimateHealth App</h3>
    <p>Access multilingual insights, full content & verified contributors inside the app.</p>
    <a href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth" class="btn">
      Download Now
    </a>
  </div>

  <div class="footer">
    UltimateHealth © 2026 · All Rights Reserved
  </div>

</div>

</body>
</html>
`;
}


function generateProfessionalHTML(article, dynamicLink) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${article.title}</title>

    <!-- Open Graph -->
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.description}" />
    <meta property="og:type" content="article" />

    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f5f7fa;
        color: #222;
      }

      .container {
        max-width: 720px;
        margin: auto;
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border-radius: 16px;
        overflow: hidden;
      }

      .hero img {
        width: 100%;
        height: auto;
        display: block;
      }

      .content {
        padding: 24px;
      }

      h1 {
        margin: 0 0 16px;
        font-size: 26px;
      }

      p {
        color: #555;
        line-height: 1.6;
      }

      .btn {
        display: inline-block;
        padding: 14px 24px;
        margin-top: 20px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
      }

      .primary {
        background: #111;
        color: white;
      }

      .secondary {
        background: #e9ecef;
        color: #111;
        margin-left: 10px;
      }

      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #888;
      }
    </style>
  </head>

  <body>

    <div class="container">

      

      <div class="content">
        <h1>${article.title}</h1>
        <p>${article.description}</p>

        <a href="https://uhsocial.in/api/share/blog/${article.pb_recordId}" class="btn primary">
          See the blog
        </a>

        <a href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
           class="btn secondary">
          Download App
        </a>
      </div>

      <div class="footer">
        For the best experience, open this article inside the UltimateHealth app.
      </div>

    </div>

  </body>
  </html>
  `;
}

function generatePodcastHTML(podcast, dynamicLink) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${podcast.title}</title>

    <!-- Open Graph -->
    <meta property="og:title" content="${podcast.title}" />
    <meta property="og:description" content="${podcast.description}" />
    <meta property="og:image" content="${podcast.audio_url}" />
    <meta property="og:type" content="voice" />

    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f4f6f9;
        color: #222;
      }

      .container {
        max-width: 720px;
        margin: auto;
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border-radius: 16px;
        overflow: hidden;
      }

      .hero img {
        width: 100%;
        display: block;
      }

      .content {
        padding: 24px;
      }

      h1 {
        margin: 0 0 16px;
        font-size: 26px;
      }

      p {
        color: #555;
        line-height: 1.6;
      }

      .btn {
        display: inline-block;
        padding: 14px 24px;
        margin-top: 20px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
      }

      .primary {
        background: #111;
        color: white;
      }

      .secondary {
        background: #e9ecef;
        color: #111;
        margin-left: 10px;
      }

      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #888;
      }

   
    </style>
  </head>

  <body>

    <div class="container">

      <div class="hero">
        <img src="${podcast.audio_url}" alt="Podcast Cover" />
      </div>

      <div class="content">
        <h1>${podcast.title}</h1>
        <p>${podcast.description}</p>

        <a href="${dynamicLink}" class="btn primary">
          Listen in UltimateHealth App
        </a>

        <a href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
           class="btn secondary">
          Download App
        </a>
      </div>

      <div class="footer">
        For the best experience, listen inside the UltimateHealth app.
      </div>

    </div>

  </body>
  </html>
  `;
}

function formatViewCount(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

// By the way,  I will later give it a proper structure after 14th February, 2026. For now, I just want to make sure that the dynamic links are working and the content is being rendered properly on the webview. The code is a bit messy because of that, but it will be cleaned up soon.
