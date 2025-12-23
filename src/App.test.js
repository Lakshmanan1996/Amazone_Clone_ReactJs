import { render, screen } from '@testing-library/react';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';

test('renders learn react link', () => {
  render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
