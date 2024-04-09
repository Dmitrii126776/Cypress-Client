require('dotenv').config();
const nodemailer = require("nodemailer");

const html = `
    <h2>Hi Team,</h2>
    <p>This is Cypress Report</p>
    <p>Best regards,</p>
    <p>Dmitrii</p>
`;

const mailList = [
    process.env.SEND_EMAIL_TO_FIRST,
]

async function main() {
    let transporter = nodemailer.createTransport({
        host: process.env.SEND_EMAIL_HOST,
        port: process.env.SEND_EMAIL_PORT,
        secure: process.env.SEND_EMAIL_SECURE,
        auth: {
            user: process.env.SEND_EMAIL_USER,
            pass: process.env.SEND_EMAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `Dmitrii <${process.env.SEND_EMAIL_USER}>`,
        to: mailList,
        subject: "Cypress Tests Report",
        html: html,
        attachments: [{
            filename: 'index.html',
            path: 'cypress/reports/html/index.html'
        }]
    });
    console.log("Email was successfully sent");
}

main()
    .catch(err => console.log(err));
