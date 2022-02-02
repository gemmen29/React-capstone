import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureStore from 'redux-mock-store';
import Details from '../components/Details/Details';

const regions = [
  { name: 'Cairo', today_confirmed: 500000 },
  { name: 'Sohag', today_confirmed: 100000 },
  { name: 'Assiut', today_confirmed: 100000 },
  { name: 'Giza', today_confirmed: 300000 },
];

describe('Home component', () => {
  test('Test Rendering regions', () => {
    const intialState = {
      regions: { regions: [...regions], total: 1000000 },
    };

    const middlewares = [thunk, logger];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ data: intialState });

    const tree = render(
      <Provider store={store}>
        <Details />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(4);
  });
});
