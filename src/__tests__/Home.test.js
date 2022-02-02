import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureStore from 'redux-mock-store';
import Home from '../components/Home/Home';

const countries = [
  { name: 'Egypt', today_confirmed: 1000000 },
  { name: 'Italy', today_confirmed: 2000000 },
  { name: 'Spain', today_confirmed: 3000000 },
  { name: 'England', today_confirmed: 4000000 },
];

const totalCountries = 10000000;

describe('Home component', () => {
  test('Test Rendering countries', () => {
    const intialState = {
      countries: [...countries],
      total: totalCountries,
    };

    const middlewares = [thunk, logger];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ data: intialState });
    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(4);
  });
});
