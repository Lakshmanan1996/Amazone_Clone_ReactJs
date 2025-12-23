import { render, screen } from '@testing-library/react';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';

test('renders Add to Basket button', () => {
  render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );

  const button = screen.getAllByText(/add to basket/i)[0];
  expect(button).toBeInTheDocument();
});
