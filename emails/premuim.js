if (!process.env.DOMAIN) {
    throw new Error("❌ DOMAIN is undefined")
}

export default function premium(profile) {
    return (
        `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to CV Builder Pro</title>
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
                .divider {
                    width: 50px;
                    height: 3px;
                    background-color: #004aad;
                    margin: 20px auto;
                    border-radius: 2px;
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
                .feature-list {
                    text-align: left;
                    background: #fafafa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 20px;
                }
                .feature-list ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .feature-list li {
                    font-size: 16px;
                    color: #333;
                    padding: 8px 0;
                    display: flex;
                    align-items: center;
                }
                .feature-list li::before {
                    content: "✔️";
                    color: #ff9800;
                    font-weight: bold;
                    margin-right: 10px;
                }
                .cta-container {
                    text-align: center;
                    margin-top: 30px;
                }
                .cta-button {
                    display: inline-block;
                    background-color: #004aad;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .cta-button:hover {
                    background-color: #e68900;
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
            </style>
        </head>
        <body>

            <div class="container">
                <div class="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/909/909212.png" alt="CV Builder Logo">
                </div>
                <div class="header">
                    <h1>Welcome to CV Builder Pro, ${profile}!</h1>
                    <p>You’ve unlocked the full power of professional CV building.</p>
                </div>
                <div class="divider"></div>
                <div class="content">
                    <p>Hello <strong>${profile}</strong>,</p>
                    <p>Thank you for upgrading to <strong>CV Builder Pro</strong>! 🚀 Your journey towards a polished, job-winning resume starts now.</p>
                    <p>With Pro, you get access to premium features designed to make your CV stand out.</p>
                </div>

                <div class="feature-list">
                    <ul>
                        <li>Save <strong style="margin-inline: 6px;">unlimited CVs</strong> – No limits, edit anytime.</li>
                        <li>Advanced customization – Full control over design.</li>
                        <li>All templates available – Choose from exclusive styles.</li>
                        <li>Download in multiple formats – PDF, DOCX, TXT.</li>
                        <li>AI-powered content suggestions – Generate strong descriptions.</li>
                        <li>ATS optimization tools – Beat resume screening systems.</li>
                        <li>Priority support – Fast-track assistance when you need it.</li>
                    </ul>
                </div>

                <div class="cta-container">
                    <a href="${process.env.DOMAIN}/dashboard" class="cta-button">Start Using Pro Features</a>
                </div>

                <div class="footer">
                    <p>Need help? Our support team is here for you.</p>
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