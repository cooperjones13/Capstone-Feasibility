const puppeteer = require('puppeteer')
const fs = require('fs')

const scrape = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const URL = 'https://books.toscrape.com/';
    
    await page.goto(URL);

    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    const books = await page.evaluate(() => {
        const bookElements = document.querySelectorAll('.product_pod');
        return Array.from(bookElements).map((book)=>{
            const title = book.querySelector('h3 a').getAttribute('title')
            const price = book.querySelector('.price_color').textContent;
            const stock = book.querySelector('.instock.availability') ? 'In Stock' : "Out of Stock"
            const rating = book.querySelector('.star-rating').className.split(' ')[1];
            const link = book.querySelector('h3 a').getAttribute('href')
            return {title, price, stock, rating, link}
        })
    })

    fs.writeFileSync('books.json', JSON.stringify(books, null, 2))
    console.log(books)

    

    await browser.close();
};

scrape();