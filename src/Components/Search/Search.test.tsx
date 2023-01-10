import Search from './Search';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import store from '../../store';

describe(Search, () => {

    it('Search displays correct class Name', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
        const val = getByTestId('cartDetails').className;
        expect(val).toEqual('boxItems')
    });

    it('Search displays correct class Name of icon', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
        const val = getByTestId('searchIcon').className;
        expect(val).toEqual('fa fa-search')
    });

    it('Search displays correct class Name of para', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Search />
            </Provider>
        )
        const val = getByTestId('msgText').className;
        expect(val).toEqual('warningMsg')
    });

    it('Search displays correct text in para', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Search />
           </Provider>
        )
        const val = getByTestId('msgText').textContent;
        expect(val).toEqual('No location added to watchlist')
    });
})