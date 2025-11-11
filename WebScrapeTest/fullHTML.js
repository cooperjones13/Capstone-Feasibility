const {chromium} = require("playwright");
const fs = require("fs");

(async () => {
    // 1. Random User Agent (replace this with a library or a large list)
    const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.3537.57';

    const browser = await chromium.launch({
        headless: true,
        // Add proxy settings here (e.g., from your residential proxy provider)
        // proxy: { server: 'http://user:pass@proxy.example.com:8080' } 
    });

    const context = await browser.newContext({
        userAgent: USER_AGENT,
        viewport: { width: 1280, height: 720 },
        locale: 'en-US',
        timezoneId: 'America/Los_Angeles',
    });

    // 2. Disable navigator.webdriver flag
    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
        });
    });

    const page = await context.newPage();
    
    // 3. Navigate and add random delay
    await page.goto('https://www.ticketmaster.com/phoenix-suns-vs-new-orleans-pelicans-phoenix-arizona-11-10-2025/event/19006307EA74753C', { waitUntil: 'domcontentloaded' });
    
    // Wait for a random time (e.g., 2 to 5 seconds)
    const randomDelay = Math.random() * 3000 + 2000; 
    console.log(`Waiting for ${Math.round(randomDelay / 1000)} seconds...`);
    await page.waitForTimeout(randomDelay); 

    const htmlContent = await page.content();

    console.log('--- Full Page HTML Content ---');
    console.log(htmlContent); // Print the first 500 characters
    console.log('----------------------------');

    const filePath = 'scraped_output.html';
    try {
        // 3. Write the content to the file
        // The 'utf8' encoding is standard for text/HTML files
        fs.writeFileSync(filePath, htmlContent, 'utf8');
        
        console.log(`✅ Successfully saved the HTML content to: ${filePath}`);

    } catch (error) {
        console.error('❌ An error occurred while writing the file:', error);
    }

    await browser.close();
})();