const { assert } = require('chai');

describe('если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async () => {
    it('-> страница товара', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        const cartBadge = await browser.$('.CartBadge');
        
        assert(cartBadge.isDisplayed());
    });

    it('-> каталог', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        await browser.url('/hw/store/catalog');

        const cartBadge = await browser.$('.CartBadge');

        assert(cartBadge.isDisplayed());
    });
});

describe('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
    it('', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        const cartBadge = await browser.$('.CartBadge');
        let store = await browser.execute(() => JSON.parse(localStorage.getItem("example-store-cart")));
        const count = store["0"]["count"];
        await btn.click();
        store = await browser.execute(() => JSON.parse(localStorage.getItem("example-store-cart")));

        assert(count + 1 === store["0"]["count"]);
    });
});

describe('содержимое корзины должно сохраняться между перезагрузками страницы', async () => {
    it('', async function({browser}) {
        await browser.url('/hw/store/');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const store = await browser.execute(() => localStorage.getItem("example-store-cart"));
        await browser.execute(() => location.reload())
        const store2 = await browser.execute(() => localStorage.getItem("example-store-cart"));

        assert(store === store2);
    });
});