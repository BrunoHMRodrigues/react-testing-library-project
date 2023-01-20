import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  const about = screen.getByRole('link', { name: 'About' });

  userEvent.click(about);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/about');
});
describe('Teste o componente <About.js />', () => {
  it('Página contém as informações sobre a Pokédex', () => {
    const pokedexTitle = screen.getByRole('heading', { level: 1, name: 'Pokédex' });

    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Página contém um heading h2 com o texto About Pokédex', () => {
    const pokedexAbout = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(pokedexAbout).toBeInTheDocument();
  });

  it('Página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const paragraph2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Página contém a seguinte imagem de uma Pokédex', () => {
    const pokedexImg = screen.getByRole('img', { class: 'pokedex-image' });
    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
