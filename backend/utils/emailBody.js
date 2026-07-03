
module.exports.ARTICLE_PUBLISH = `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f7fc;
            }
            .container {
                width: 80%;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #00BFFF;
                color: white;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                padding: 10px;
            }
            .note {
                background-color: #e7f4e7;
                padding: 10px;
                border-left: 5px solid #28a745;
                margin-top: 20px;
            }
            .btn {
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Article Published: {title}</h1>
            </div>
            <div class="content">
                <p>Dear Author,</p>
                <p>We are excited to inform you that your article titled "<strong>{title}</strong>" has been successfully published on UltimateHealth!</p>

                <p>Your work is now live for our readers to enjoy, and we are thrilled to share your insights with the community. We sincerely appreciate the effort you’ve put into this article and hope it resonates with many!</p>

                <div class="note">
                    <p><strong>Note:</strong> You can view your article by following this <a href="{articleLink}" class="btn">link</a>.</p>
                </div>

                <p>Thank you for contributing to UltimateHealth. If you have any questions or need further assistance, don’t hesitate to reach out!</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>UltimateHealth Team</p>
            </div>
        </div>
    </body>
</html>`;

module.exports.ARTICLE_FEEDBACK= `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fc;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #00BFFF;
                            color: white;
                            padding: 15px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            padding: 10px;
                        }
                        .note {
                            background-color: #ffecb3;
                            padding: 10px;
                            border-left: 5px solid #ffb300;
                            margin-top: 20px;
                        }
                        .btn {
                            background-color: #28a745;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 5px;
                            text-decoration: none;
                            display: inline-block;
                            margin-top: 20px;
                        }
                        .btn:hover {
                            background-color: #218838;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1> Feedback for "{title}"</h1>
                        </div>
                        <div class="content">
                            <p>Dear Author,</p>
                            <p>I hope this message finds you well!</p>
                            <p>We have reviewed your article titled "<strong>{title}</strong>" and would like to provide some feedback:</p>

                            <p><strong>Feedback:</strong></p>
                            <p>{feedback}</p>

                            <p>We believe your article has great potential, and with a few adjustments, it will be even more impactful. Please review the feedback and feel free to reach out if you need further clarification.</p>

                            <div class="note">
                                <p><strong>Note:</strong> If no action is taken within 4 days, the article will automatically be discarded from our review process.</p>
                            </div>

                            <p>We look forward to your revised article. Please don't hesitate to get in touch if you have any questions!</p>
        
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`;

 module.exports.ARTICLE_DISCARDED_IN_REVIEW_STATE_NO_ACTION =   `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Article Discarded: "{title}"</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your article titled "<strong>{title}</strong>" has been discarded from our review process.</p>

              <p><strong>Reason for Discard:</strong> {reason} </p>

              <p>Our review system automatically discards submissions that do not meet the necessary criteria or deadlines.</p>

              <p>If you would like to address the issue and resubmit your article, or if you have any questions regarding this decision, please don’t hesitate to contact us. We would be happy to review your work again.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new article for review at any time.</p>
              </div>

              <p>We appreciate your effort and wish you success in your creative journey.</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`

 module.exports.ARTICLE_DISCARDED_FROM_SYSTEM = `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Article Discarded: "{title}"</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your article titled "<strong>{title}</strong>" has been discarded from our review process due to the lack of action taken within the required review period of 30 days.</p>

              <p>Our review system automatically discards articles that do not receive feedback or revisions within the set time frame. Unfortunately, we did not receive any updates or revisions within the 30-day deadline.</p>

              <p>If you would like to resubmit your article or have any questions, feel free to contact us for further assistance. We would be happy to consider your work again in the future.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new articles for review at any time.</p>
              </div>

              <p>We wish you the best in your future writing endeavors!</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`;

module.exports.PODCAST_PUBLISH = `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f7fc;
            }
            .container {
                width: 80%;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #00BFFF;
                color: white;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                padding: 10px;
            }
            .note {
                background-color: #e7f4e7;
                padding: 10px;
                border-left: 5px solid #28a745;
                margin-top: 20px;
            }
            .btn {
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Podcast Published: {title}</h1>
            </div>
            <div class="content">
                <p>Dear Author,</p>
                <p>We are excited to inform you that your podcast titled "<strong>{title}</strong>" has been successfully published on UltimateHealth!</p>

                <p>Your work is now live for our listeners to enjoy, and we are thrilled to share your insights with the community. We sincerely appreciate the effort you’ve put into this content and hope it resonates with many!</p>

                <div class="note">
                    <p><strong>Note:</strong> You can view your podcast by following this <a href="{podcastLink}" class="btn">link</a>.</p>
                </div>

                <p>Thank you for contributing to UltimateHealth. If you have any questions or need further assistance, don’t hesitate to reach out!</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>UltimateHealth Team</p>
            </div>
        </div>
    </body>
</html>`;

module.exports.PODCAST_DISCARDED =  `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Podcast Discarded: "{title}"</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your podcast titled "<strong>{title}</strong>" has been discarded from our review process.</p>

              <p><strong>Reason for Discard:</strong> {reason} </p>

              <p>Our review system automatically discards submissions that do not meet the necessary criteria or deadlines.</p>

              <p>If you would like to address the issue and resubmit your podcast, or if you have any questions regarding this decision, please don’t hesitate to contact us. We would be happy to review your work again.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new podcasts for review at any time.</p>
              </div>

              <p>We appreciate your effort and wish you success in your creative journey.</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`;

 module.exports.PODCAST_DISCARDED_FROM_SYSTEM = `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Podcast Discarded: "{title}"</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your podcast titled "<strong>{title}</strong>" has been discarded from our review process due to the lack of action taken within the required review period of 30 days.</p>

              <p>Our review system automatically discards contents that do not receive feedback or revisions within the set time frame. Unfortunately, we did not receive any updates or revisions within the 30-day deadline.</p>

              <p>If you would like to resubmit your podcast or have any questions, feel free to contact us for further assistance. We would be happy to consider your work again in the future.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new podcasts for review at any time.</p>
              </div>

              <p>We wish you the best in your future!</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`;




 
