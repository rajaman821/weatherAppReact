import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { IWeatherData } from '../../Models/weatherData';
import store from '../../store';
import WeatherCard from './WeatherCard';
let data: IWeatherData;
describe(WeatherCard, () => {

    it('Search displays correct class Name', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <WeatherCard {...data} />
            </Provider>
        )
        const val = getByTestId('cardHeader').className;
        expect(val).toEqual('cardHeader')
    });

})