import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {describe, it, expect} from '@jest/globals'
import {render} from '@testing-library/react'
import {createStore} from "redux";

import {Application} from "../../src/client/Application";

const initialState = {
    products: {},
    details: {},
    cart: {}
}

const basename = '/';
const store = createStore(() => initialState)

describe('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
    // const products =
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application/>
            </Provider>
        </BrowserRouter>
    );

    it('главная', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('home').textContent).toBe('Example store');
    });
    it('каталог', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('catalog').textContent).toBe('Catalog');
    });
    it('доставка', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('delivery').textContent).toBe('Delivery');
    });
    it('контакты', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('contacts').textContent).toBe('Contacts');
    });
    it('корзина', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('cartLabel').textContent).toContain('Cart');
    });
});