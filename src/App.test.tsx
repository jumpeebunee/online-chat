import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
    {wrapper: BrowserRouter}
  );

  expect(getByText(/или/i)).toBeInTheDocument();
});
