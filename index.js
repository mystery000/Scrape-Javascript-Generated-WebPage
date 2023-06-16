const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.pinksale.finance/launchpad/0x148c295B7EE3A854d0dCD37dD10B7994c920f55B?chain=ETH', { waitUntil: 'networkidle2' });

    const tokenName = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('td')); 
        const tokenNameIndex = tds.findIndex(td => td.textContent.includes('Token Name'));
        return tds[tokenNameIndex + 1].textContent;
    });

    console.log(`Token name: ${tokenName}`);
    
    await browser.close();
}

run();
