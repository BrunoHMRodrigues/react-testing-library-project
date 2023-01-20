import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/nao-existe');
  });

  //   const { location: { pathname } } = history;

//   expect(pathname).toBe('/about');
});

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const notFound = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });

    expect(notFound).toBeInTheDocument();
  });

  it('Página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const img = screen.getByRole('img');

    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
