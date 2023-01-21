import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  151: false };

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

const moreDetailsText = 'More details';
describe('Teste o componente <Pokemon.js />', () => {
  describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    it('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />);
      const getPikachu = screen.getByText('Pikachu');

      expect(getPikachu).toBeInTheDocument();
    });

    it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />);
      const countEletricText = screen.getByText('Electric');

      expect(countEletricText).toBeInTheDocument();
    });

    it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />);
      const weight = screen.getByText('Average weight: 6.0 kg');

      expect(weight).toBeInTheDocument();
    });

    it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ isPokemonFavoriteById[pokemon.id] }
      />);
      const getPikachuImg = screen.getByAltText('Pikachu sprite');

      expect(getPikachuImg).toBeInTheDocument();
      expect(getPikachuImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    });
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[pokemon.id] }
    />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });

    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });

    userEvent.click(moreDetails);
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsText });

    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');
  });

  describe('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    it('O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg e A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite, onde <Pokemon> é o nome do Pokémon exibido', () => {
      const isFavorite = true;
      renderWithRouter(<Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />);

      const markFavorite = screen.getByAltText('Pikachu is marked as favorite');

      expect(markFavorite).toBeInTheDocument();
      expect(markFavorite).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
