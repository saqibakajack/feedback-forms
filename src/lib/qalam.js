import puppeteer from "puppeteer";

const getPuppeteerPage = async ({username, password, page}) => {
    await page.goto('https://qalam.nust.edu.pk/', {waitUntil: 'load', timeout: 0});

    await page.type('#login', username);
    await page.type('#password', password);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({waitUntil: 'load', timeout: 0});
    if (page.url() === 'https://qalam.nust.edu.pk/web/login') {
        throw new Error('Invalid username or password');
    }
    return page;
}
export default getPuppeteerPage;
