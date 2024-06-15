const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const reportDir = path.join(__dirname, 'cypress/reports/html');
const htmlFile = path.join(reportDir, 'index.html');
const assetsDir = path.join(reportDir, '');

// Read the HTML file
fs.readFile(htmlFile, 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }

    const $ = cheerio.load(html);

    // Inline CSS
    $('link[rel="stylesheet"]').each((i, elem) => {
        const href = $(elem).attr('href');
        const cssFile = path.join(assetsDir, href);
        const cssContent = fs.readFileSync(cssFile, 'utf8');
        $(elem).replaceWith(`<style>${cssContent}</style>`);
    });

    // Inline JS
    $('script').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src) {
            const jsFile = path.join(assetsDir, src);
            const jsContent = fs.readFileSync(jsFile, 'utf8');
            $(elem).replaceWith(`<script>${jsContent}</script>`);
        }
    });

    // Save the updated HTML
    fs.writeFile(htmlFile, $.html(), 'utf8', (err) => {
        if (err) {
            console.error('Error writing updated HTML file:', err);
        } else {
            console.log('Successfully inlined CSS and JS into HTML file.');
        }
    });
});
