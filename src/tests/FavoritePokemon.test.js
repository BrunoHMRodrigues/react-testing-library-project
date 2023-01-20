import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

    userEvent.click(favorite);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');

    const msg = screen.getByText('No favorite Pokémon found');

    expect(msg).toBeInTheDocument();
  });

  it('Apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const details = screen.getByText('More details');
    expect(details).toBeInTheDocument();

    userEvent.click(details);

    const favoriteCheckBox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    userEvent.click(favoriteCheckBox);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favorite);

    const favPikachu = screen.getByText('Pikachu');
    expect(favPikachu).toBeInTheDocument();
  });
});
