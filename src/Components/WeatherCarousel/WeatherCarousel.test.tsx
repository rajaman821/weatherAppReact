import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import store from '../../store';
import WeatherCarousel from './WeatherCarousel';

describe(WeatherCarousel, () => {

    it('WeatherCarousel displays correct class Name', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCarousel />
            </Provider>
        )
        const val = getByTestId('carouselItem').className;
        expect(val).toEqual('container')
    });



    it('WeatherCarousel displays correct class Name of table', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCarousel />
            </Provider>
        )
        const val = getByTestId('tableItem').className;
        expect(val).toEqual('miscHeader')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCarousel />
            </Provider>
        )
        const val = getByTestId('time').textContent;
        expect(val).toEqual('TIME')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCarousel />
            </Provider>
        )
        const val = getByTestId('pressure').textContent;
        expect(val).toEqual('PRESSURE')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCarousel />
            </Provider>
        )
        const val = getByTestId('rain').textContent;
        expect(val).toEqual('%RAIN')
    });

    it('WeatherCarousel displays correct text in td', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCarousel />
            </Provider>
        )
        const val = getByTestId('humidity').textContent;
        expect(val).toEqual('HUMIDITY')
    });
})