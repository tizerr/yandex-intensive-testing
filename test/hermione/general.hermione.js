const { assert } = require('chai');

describe('Общие требования:', async () => {
    it('вёрстка должна адаптироваться под ширину экрана', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(1920, 1080);

        const a = await browser.$('.Application');
        await a.waitForExist();
        await browser.assertView('plain', '.Application', {
            compositeImage: true,
        });

        // assert.equal('', '');

    });

    it('название магазина в шапке должно быть ссылкой на главную страницу', async function({browser}) {
        await browser.url('/hw/store/catalog');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const link = await browser.$('.Application-Brand')
        await link.click()
        const url = await browser.getUrl()

        assert(url.endsWith('/hw/store/'));

    });

    it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(575, 500);

        const a = await browser.$('.Application');
        await a.waitForExist();

        const toggler = await browser.$('.Application-Toggler')

        assert(await toggler.isDisplayed());

    });
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(575, 500);

        const a = await browser.$('.Application');
        await a.waitForExist();

        const toggler = await browser.$('.Application-Toggler');
        await toggler.click();
        const menu = await browser.$('.Application-Menu');
        const link = await browser.$('.test-link');
        await link.click();

        assert(menu.isDisplayed());

    });
});