import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

test('check base email input', () => {
  render(
    <Provider store={store}>
      <LoginPage/>
    </Provider>,
    {wrapper: BrowserRouter}
  );

  const emailInput = screen.getByTestId('email-input');
  expect(emailInput).toHaveValue('');
  fireEvent.input(emailInput, {
    target: {value: 'testInput'}
  })
  expect(emailInput).toHaveValue('testInput');
});

