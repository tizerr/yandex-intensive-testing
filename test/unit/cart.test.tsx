import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {describe, it, expect} from '@jest/globals'
import {getAllByTestId, render} from '@testing-library/react'
import {createStore} from "redux";
import {Application} from "../../src/client/Application";
import {Cart} from "../../src/client/pages/Cart";

const initialState = {
    products: [
        {id: 0, name: 'a', price: 100,},
        {id: 1, name: 'b', price: 200,}
    ],
    details: {
        0: {
            description: 'a',
            material: 'a',
            color: 'a',
        },
        1: {
            description: 'b',
            material: 'b',
            color: 'b',
        }
    },
    cart: {0: {name: 'a', price: 100, count: 2}, 1: {name: 'b', price: 100, count: 1}, 2: {name: 'c', price: 100, count: 3}}
}

const basename = '/';
const store = createStore(() => initialState)
const storeWithoutCart = createStore(() => ({products: initialState.products, details: initialState.details, cart: {}}))

describe('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
    // const products =
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application/>
            </Provider>
        </BrowserRouter>
    );

    it('', () => {
        const {getByTestId} = render(application);
        const label = getByTestId('cartLabel')
        expect(label.textContent).toBe('Cart (3)')
    });
});

describe('в корзине должна отображаться таблица с добавленными в нее товарами', () => {
    // const products =
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Cart/>
            </Provider>
        </BrowserRouter>
    );

    it('', () => {
        const {getByTestId} = render(application);
        const table = getByTestId('cartTable');
        expect(table);
    });
});

describe('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', () => {
    // const products =
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Cart/>
            </Provider>
        </BrowserRouter>
    );
    it('название', () => {
        const {container} = render(application);
        const rows = getAllByTestId(container, 'name');
        for (const row of rows) {
            expect(row)
        }
    });
    it('цена', () => {
        const {container} = render(application);
        const rows = getAllByTestId(container, 'price');
        for (const row of rows) {
            expect(row)
        }
    });
    it('количество', () => {
        const {container} = render(application);
        const rows = getAllByTestId(container, 'count');
        for (const row of rows) {
            expect(row)
        }
    });
    it('стоимость', () => {
        const {container} = render(application);
        const rows = getAllByTestId(container, 'total');
        for (const row of rows) {
            expect(row)
        }
    });

    it('общая сумма заказа', () => {
        const {getByTestId} = render(application);
        const total = getByTestId('cartTotal');
        expect(total);
    });
});

describe('если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={storeWithoutCart}>
                <Cart/>
            </Provider>
        </BrowserRouter>
    );
    it('', () => {
        const {getByTestId} = render(application);
        const link = getByTestId('emptyLink');
        expect(link.textContent).toBe('catalog');
    });

});