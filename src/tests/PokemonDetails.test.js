import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByText('More details');
  userEvent.click(moreDetails);
});
describe('Teste o componente <PokemonDetails.js />', () => {
  describe('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
      const moreDetailsText = screen.getByText('Pikachu Details');
      expect(moreDetailsText).toBeInTheDocument();
    });
    it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
      const moreDetails = screen.queryByRole('link', { name: 'More details' });
      expect(moreDetails).not.toBeInTheDocument();
    });
    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const title = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(title).toBeInTheDocument();
    });
    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
      const resume = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
      expect(resume).toBeInTheDocument();
    });
  });
  describe('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido', () => {
      const gameLocation = screen.getByText('Game Locations of Pikachu');
      expect(gameLocation).toBeInTheDocument();
    });
    it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
      const countPikachuLocation = screen.getAllByAltText('Pikachu location');
      expect(countPikachuLocation.length).toBe(2);
    });
    it('Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização com atributo src com a URL da localização e alt com <name> location, onde <name> é o nome do pokemon', () => {
      const countPikachuLocation = screen.getAllByAltText('Pikachu location');
      const countLocationText = screen.getAllByText(/kanto/i);
      expect(countPikachuLocation.length).toBe(2);
      expect(countPikachuLocation[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
      expect(countPikachuLocation[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(countLocationText.length).toBe(2);
    });
  });
  describe('o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon e O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
      expect(checkbox).toBeInTheDocument();
    });
    it('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos', () => {
      const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
      userEvent.click(checkbox);
      const isFavorite = screen.getByAltText('Pikachu is marked as favorite');
      expect(isFavorite).toBeInTheDocument();
      userEvent.click(checkbox);
      expect(isFavorite).not.toBeInTheDocument();
    });
  });
});
