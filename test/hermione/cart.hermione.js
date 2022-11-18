const { assert } = require('chai');

describe('Каталог:', async () => {
    it('если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        const cartBadge = await browser.$('.CartBadge');
        
        assert(cartBadge.isDisplayed());
    });
    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function({browser}) {
        await browser.url('/hw/store/catalog/0');

        const a = await browser.$('.Application');
        await a.waitForExist();

        const btn = await browser.$('.ProductDetails-AddToCart')
        await btn.click();

        await browser.url('/hw/store/cart');
        const btnCart = await browser.$('.Cart-Clear');
        await btnCart.click();
        const store = await browser.execute(() => localStorage.getItem("example-store-cart"));

        assert(store === '{}');
    });
});