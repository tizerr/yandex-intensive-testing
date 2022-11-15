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

describe('Pages', () => {
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    it('has main page', () => {
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

    it('has catalog page', () => {
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

    it('has delivery page', () => {
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

    it('has contacts page', () => {
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