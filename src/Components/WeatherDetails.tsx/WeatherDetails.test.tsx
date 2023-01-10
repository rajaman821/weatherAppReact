import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import store from '../../store';
import WeatherDetails from './WeatherDetails';
import Button from 'react-bootstrap/Button';

describe(WeatherDetails, () => {

    it('WeatherDetails displays correct class Name', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
            </Provider>
        )
        const val = getByTestId('backBtn').className;
        expect(val).toEqual('backBtn')
    });

    it('WeatherDetails displays correct text in back button', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
            </Provider>
        )
        const val = getByTestId('backBtn').textContent;
        expect(val).toEqual('Back')
    });

    it('WeatherDetails displays correct text in add to list button', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
            </Provider>
        )
        const val = getByTestId('addToList').textContent;
        expect(val).toEqual('Add to list')
    });

    it('WeatherDetails displays correct text in Already added button', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
            </Provider>
        )
        const val = getByTestId('alreadyAdded').textContent;
        expect(val).toEqual('Already Added')
    });

    it('WeatherDetails displays correct text in Remove button', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
            </Provider>
        )
        const val = getByTestId('removeBtn').textContent;
        expect(val).toEqual('Remove')
    });



    it('WeatherDetails displays correct class Name of table', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
            </Provider>
        )
        const val = getByTestId('tableItem').className;
        expect(val).toEqual('miscHeader')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
           </Provider>
        )
        const val = getByTestId('time').textContent;
        expect(val).toEqual('TIME')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
           </Provider>
        )
        const val = getByTestId('pressure').textContent;
        expect(val).toEqual('PRESSURE')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
           </Provider>
        )
        const val = getByTestId('rain').textContent;
        expect(val).toEqual('%RAIN')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherDetails />
           </Provider>
        )
        const val = getByTestId('humidity').textContent;
        expect(val).toEqual('HUMIDITY')
    });
})