import getPuppeteerPage from "@/lib/qalam";
import puppeteer from "puppeteer";

export const getForms = async (req, res) => {
    const {username, password} = req;

    const browser = await puppeteer.launch();
    let page = await browser.newPage();

    page = await getPuppeteerPage({username, password, page});

    await page.goto('https://qalam.nust.edu.pk/student/qa/feedback', {waitUntil: 'load', timeout: 0});

    let forms = await page.evaluate(
        () => Array.from(
            document.querySelectorAll('.uk-row-first'),
            (elem) => {
                const textElem = elem.querySelector('.md-list-heading');
                const linkElem = elem.querySelector('.md-list-addon-element');

                const text = textElem ? textElem.innerText : null;
                return {
                    name: text.split('-').at(-1).trim(),
                    description: text.replace(/-/g, ' '),
                    link: linkElem ? linkElem.getAttribute('href') : ''
                }
            }
        )
    );

    forms = forms.filter((form) => form.link !== null && form.link.startsWith(`/survey/fill/`) && (form.description.toLowerCase().includes('faculty')));

    await browser.close();
    res.status(200).json(forms);
}

export const submitForm = async (req, res) => {
    const {username, password} = req;
    const {link} = req.body;

    const browser = await puppeteer.launch();
    let page = await browser.newPage();

    page = await getPuppeteerPage({username, password, page});

    await page.goto(`https://qalam.nust.edu.pk${link}`, {waitUntil: 'load', timeout: 0});

    let option = await page.$('input[type="radio"]');

    while (option) {
        await option.click();
        await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0});
        option = await page.$('input[type="radio"]');
    }

    const textarea = await page.$('textarea');
    if (!textarea) {
        await browser.close();
        throw new Error('Form expired or already submitted');
    }
    await textarea.type('This is a comment.');

    const form = await page.$('button[value=finish]');
    await form.evaluate( form => form.click() );
    await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0});

    await browser.close();

    res.status(200).json({message: 'Form submitted successfully'});
}
