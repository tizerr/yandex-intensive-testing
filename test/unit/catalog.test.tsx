import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {describe, it, expect} from '@jest/globals'
import {getAllByTestId, render} from '@testing-library/react'
import {createStore} from "redux";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {Catalog} from "../../src/client/pages/Catalog";

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
    cart: {}
}

const basename = '/';
const store = createStore(() => initialState)

describe('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', () => {
    // const products =
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Catalog/>
            </Provider>
        </BrowserRouter>
    );

    it('название', () => {
        const {container} = render(application);
        const products = getAllByTestId(container, 'name')
        for (const i in products) {
            expect(products[i].textContent).toBe(initialState.products[i].name)
        }
    });
    it('цена', () => {
        const {container} = render(application);
        const products = getAllByTestId(container, 'price')
        for (const i in products) {
            expect(products[i].textContent).toBe(`$${initialState.products[i].price}`)
        }
    });
    it('ссылка', () => {
        const {container} = render(application);
        const products = getAllByTestId(container, 'link')
        for (const i in products) {
            expect(products[i].textContent).toBe('Details')
        }
    });
});

describe('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
    const product = {...initialState.products[0], ...initialState.details[0]};
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <ProductDetails product={product}/>
            </Provider>
        </BrowserRouter>
    );

    it('название', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('name').textContent).toBe(product.name);
    });

    it('описание', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('desc').textContent).toBe(product.description);
    });

    it('цена', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('price').textContent).toBe(`$${product.price}`);
    });

    it('цвет', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('color').textContent).toBe(product.color);
    });

    it('материал', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('mat').textContent).toBe(product.material);
    });

    it('кнопка', () => {
        const { getByTestId } = render(application);
        expect(getByTestId('btn').textContent).toBe('Add to Cart');
    });
});
