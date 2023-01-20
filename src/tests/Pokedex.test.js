import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemonList from '../data';

const fetchPokemonTypes = () => [...new Set(pokemonList
  .reduce((types, { type }) => [...types, type], []))];

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  151: false };

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
});

const nextPokemon = 'Próximo Pokémon';
describe('Teste o componente <Pokedex.js />', () => {
  it('Página contém um heading h2 com o texto Encountered Pokémon', () => {
    // renderWithRouter(<App />);
    const encounterTitle = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(encounterTitle).toBeInTheDocument();
  });
  describe('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    it('O botão deve conter o texto Próximo Pokémon', () => {
    //   renderWithRouter(<App />);
      const btnNext = screen.getByRole('button', { name: nextPokemon });
      expect(btnNext).toBeInTheDocument();
    });
    it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão e O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
    //   renderWithRouter(<App />);
      const btnNext = screen.getByRole('button', { name: nextPokemon });
      expect(btnNext).toBeInTheDocument();
      for (let index = 0; index < pokemonList.length; index += 1) {
        const { name } = pokemonList[index];
        const getPokemon = screen.getByText(name);
        expect(getPokemon).toBeInTheDocument();
        userEvent.click(btnNext);
      }
      const getPikachu = screen.getByText('Pikachu');
      expect(getPikachu).toBeInTheDocument();
    });
    it('Teste se é mostrado apenas um Pokémon por vez', () => {
    //   renderWithRouter(<App />);
      const countWeights = screen.getAllByText(/average weight:/i);
      expect(countWeights.length).toBe(1);
    });
    describe('Pokédex tem os botões de filtro', () => {
      it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
        // renderWithRouter(<App />);
        const typeBtns = screen.getAllByTestId('pokemon-type-button');
        expect(typeBtns.length).toBe(7);
        const pokemonTypes = fetchPokemonTypes();

        for (let index = 0; index < pokemonTypes.length; index += 1) {
          expect(typeBtns[index].innerHTML).toBe(pokemonTypes[index]);
        }
      });
      it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
        // renderWithRouter(<App />);
        const fireBtn = screen.getByRole('button', { name: 'Fire' });
        userEvent.click(fireBtn);
        const nextPok = screen.getByRole('button', { name: nextPokemon });
        expect(fireBtn).toBeInTheDocument();
        const getCharmander = screen.getByText('Charmander');
        expect(getCharmander).toBeInTheDocument();
        userEvent.click(nextPok);
        const getRapidash = screen.getByText('Rapidash');
        expect(getRapidash).toBeInTheDocument();
        userEvent.click(nextPok);
        expect(getCharmander).toBeInTheDocument();
      });
      it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
        // renderWithRouter(<App />);
        const psychicBtn = screen.getByRole('button', { name: 'Psychic' });
        userEvent.click(psychicBtn);
        const getpsychicText = screen.getAllByText('Psychic');
        expect(getpsychicText.length).toBe(2);
      });
      describe('Pokédex contém um botão para resetar o filtro', () => {
        it('O texto do botão deve ser All', () => {
          // renderWithRouter(<App />);
          const btnAll = screen.getByRole('button', { name: 'All' });
          expect(btnAll).toBeInTheDocument();
        });
        it('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
          // renderWithRouter(<App />);
          const btnAll = screen.getByRole('button', { name: 'All' });
          userEvent.click(btnAll);
          const getPikachu = screen.getByText('Pikachu');
          expect(getPikachu).toBeInTheDocument();
        });
        it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
          const getPikachu = screen.getByAltText('Pikachu sprite');
          expect(getPikachu).toBeInTheDocument();
          const nextPok = screen.getByRole('button', { name: nextPokemon });
          expect(nextPok).toBeInTheDocument();
          userEvent.click(nextPok);
          const getCharmander = screen.getByAltText('Charmander sprite');
          expect(getCharmander).toBeInTheDocument();
        });
      });
    });
  });
});
