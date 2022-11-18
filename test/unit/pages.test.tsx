import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {describe, it, expect} from '@jest/globals'
import {render} from '@testing-library/react'
import {Home} from "../../src/client/pages/Home";
import {Catalog} from "../../src/client/pages/Catalog";
import {Delivery} from "../../src/client/pages/Delivery";
import {Contacts} from "../../src/client/pages/Contacts";

const basename = '/';

const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

describe('в магазине должны быть страницы: главная, каталог, условия доставки, контакты:', () => {

    it('главная', () => {
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Home/>
                </Provider>
            </BrowserRouter>
        );

        const { getByTestId } = render(application);

        expect(getByTestId('hasPage').textContent).toBe('Welcome to Example store!');
    });

    it('каталог', () => {
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog/>
                </Provider>
            </BrowserRouter>
        );

        const { getByTestId } = render(application);

        expect(getByTestId('hasPage').textContent).toBe('Catalog');
    });

    it('условия доставки', () => {
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Delivery/>
                </Provider>
            </BrowserRouter>
        );

        const { getByTestId } = render(application);

        expect(getByTestId('hasPage').textContent).toBe('Delivery');
    });

    it('контакты', () => {
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Contacts/>
                </Provider>
            </BrowserRouter>
        );

        const { getByTestId } = render(application);

        expect(getByTestId('hasPage').textContent).toBe('Contacts');
    });
});