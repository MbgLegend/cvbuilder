if (!process.env.DOMAIN) {
    throw new Error("❌ DOMAIN is undefined")
}

export default function credits(item, quantity, price, total, name) {
    return (
        `
        <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Credit Purchase Confirmation</title>
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
                    .cart {
                        background: #fafafa;
                        padding: 20px;
                        border-radius: 8px;
                        margin-top: 20px;
                        text-align: left;
                    }
                    .cart table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .cart th, .cart td {
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                        text-align: left;
                    }
                    .cart th {
                        background: #e9ecef;
                        font-size: 16px;
                    }
                    .total {
                        font-size: 18px;
                        font-weight: bold;
                        text-align: right;
                        margin-top: 15px;
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
                        background-color: #218838;
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
                        <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Credit Icon">
                    </div>
                    <div class="header">
                        <h1>Credit Purchase Successful! 🎉</h1>
                        <p>Thank you for your purchase.</p>
                    </div>
                    <div class="divider"></div>
                    <div class="content">
                        <p>Hello <strong>${name}</strong>,</p>
                        <p>Your credits have been successfully added to your account.</p>
                    </div>
                    
                    <div class="cart">
                        <table>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            <tr>
                                <td>${item}</td>
                                <td>${quantity}</td>
                                <td>$${price}</td>
                            </tr>
                        </table>
                        <p class="total">Total: <strong>$${total}</strong></p>
                    </div>

                    <div class="cta-container">
                        <a href="${process.env.DOMAIN}/dashboard" class="cta-button">View Your Credits</a>
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