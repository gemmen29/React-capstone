import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureStore from 'redux-mock-store';
import Header from '../components/Header/Header';

describe('Home component', () => {
  test('Test Rendering countries', () => {
    const intialState = {
      show: true,
    };

    const middlewares = [thunk, logger];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ data: intialState });
    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
