import ReactDOM from 'react-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import React from 'react';

const setup = () => {
  const utils = render(<App />)
  const input = screen.getByTestId(/input/i);
  return {
    input,
    ...utils,
  }
}

test('renders react component', () => {
  render(<App />);
  const divElement = screen.getByText('todos');
  expect(divElement).toBeInTheDocument();
});


test('add todo available input', () => {
  const {input} = setup()
  fireEvent.change(input, {target: {value: 'new task added'}})
  expect((input as HTMLInputElement).value).toBe('new task added')
});

test('add todo exist task', () => {
  const {input} = setup()
  fireEvent.change(input, {target: {value: 'new task added'}});
  fireEvent.submit(input);
  const linkElement = screen.getByTestId('task');
  expect(linkElement).toBeInTheDocument();
});

test('check clear button', () => {
  render(<App />);
  const btnElement = screen.getByTestId('clearBtn');
  expect(btnElement).toBeInTheDocument();
});

test('check working of clear button', async () => {
  const {input} = setup()
  fireEvent.change(input, {target: {value: 'new task added'}})
  fireEvent.submit(input);
  const quantityElement = screen.getByTestId('quantity');
  expect(quantityElement).toHaveTextContent('1 item(s) left');
  const todoElement = screen.getByTestId('task');
  fireEvent.click(todoElement);
  const btnElement = screen.getByTestId('clearBtn');
  fireEvent.click(btnElement);
  expect(quantityElement).toHaveTextContent('0 item(s) left');
});