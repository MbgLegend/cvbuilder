if (!process.env.DOMAIN) {
    throw new Error("❌ DOMAIN is undefined")
}

export default function welcome(profile) {
    return (
        `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to CV Builder</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f3f5f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background: #ffffff;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
                        text-align: center;
                        border-top: 5px solid #004aad;
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .logo img {
                        width: 73px;
                        height: 73px;
                    }
                    .header h1 {
                        color: #333;
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .header p {
                        font-size: 16px;
                        color: #555;
                        margin: 0;
                    }
                    .content {
                        text-align: left;
                        margin-top: 30px;
                        color: #333;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 15px;
                    }
                    .cta-container {
                        text-align: center;
                        margin-top: 30px;
                    }
                    .cta-button {
                        display: inline-block;
                        background-color: #004aad;
                        color: white; /* ✅ This explicitly sets the text color */
                        text-decoration: none;
                        padding: 14px 28px;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: bold;
                        transition: background-color 0.3s ease;
                    }

                    .cta-button:hover {
                        background-color: #00388b;
                    }
                    .footer {
                        margin-top: 40px;
                        font-size: 14px;
                        color: #777;
                        text-align: center;
                    }
                    .footer a {
                        color: #004aad;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .footer a:hover {
                        text-decoration: underline;
                    }
                    .divider {
                        width: 50px;
                        height: 3px;
                        background-color: #004aad;
                        margin: 20px auto;
                        border-radius: 2px;
                    }
                </style>
            </head>
            <body>

                <div class="container">
                    <div class="logo">
                        <img src="https://cdn-icons-png.flaticon.com/512/909/909212.png" alt="CV Builder Logo">
                    </div>
                    <div class="header">
                        <h1>Welcome to CV Builder, ${profile?.name}!</h1>
                        <p>Your journey to a professional CV starts now.</p>
                    </div>
                    <div class="divider"></div>
                    <div class="content">
                        <p>Hello <strong>${profile?.name}</strong>,</p>
                        <p>We’re excited to have you on board! At <strong>CV Builder</strong>, we make creating professional resumes effortless.</p>
                        <p>Take the first step towards your dream job by crafting a CV that truly represents your skills and experience.</p>
                    </div>
                    <div class="cta-container">
                        <a href="${process.env.DOMAIN}/dashboard" class="cta-button">Build Your CV Now</a>
                    </div>
                    <div class="footer">
                        <p>Need help? Our support team is ready to assist.</p>
                        <p>
                            <a href="${process.env.DOMAIN}">Visit Our Website</a> | 
                            <a href="mailto:noreply@cvbuilder.monster">Contact Support</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `
    )
}