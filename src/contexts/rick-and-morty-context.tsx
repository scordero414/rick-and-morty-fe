// src/contexts/RickAndMortyContext.js

import {
  GetUserCharactersQueryParameters,
  UserCharacter,
} from '@/types/character';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';

const RickAndMortyContext = createContext({
  selectedUserCharacter: {} as UserCharacter,
  selectUserCharacter: (userCharacter: UserCharacter) => {},
  updateFilters: (filters: GetUserCharactersQueryParameters) => {},
  userCharacters: [] as UserCharacter[],
});

export const useRickAndMorty = () => useContext(RickAndMortyContext);

export const RickAndMortyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUserCharacter, setSelectedUserCharacter] =
    useState<UserCharacter>({} as UserCharacter);

  const [currentFilters, setCurrentFilters] =
    useState<GetUserCharactersQueryParameters>({
      userId: Number(process.env.NEXT_PUBLIC_CURRENT_SELECTED_USER),
    });

  const buildQuery = (filters: GetUserCharactersQueryParameters) => {
    const params = [];

    if (filters?.userId) {
      params.push(`userId: ${filters.userId}`);
    }

    if (filters?.gender) {
      params.push(`gender: ${filters.gender}`);
    }

    if (filters?.name) {
      params.push(`name: "${filters.name}"`);
    }

    if (filters?.species) {
      params.push(`species: "${filters.species}"`);
    }

    if (filters?.status) {
      params.push(`status: ${filters.status}`);
    }

    return `
        query CharactersByUser {
          charactersByUser(${params.join(', ')}) {
            id
            userId
            characterId
            isFavorite
            deletedAt
            createdAt
            character {
              id
              name
              status
              species
              type
              gender
              origin
              location
              image
            }
          }
        }
      `;
  };

  const query = useMemo(() => buildQuery(currentFilters), [currentFilters]);

  const [userCharacters, setUserCharacters] = useState<UserCharacter[]>([]);

  useEffect(() => {
    const getUserCharacters = async (query: string) => {
      const request = await fetch('http://localhost:4000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ query }),
      });

      return await request.json();
    };

    if (query) {
      console.log('query', query);
      getUserCharacters(query).then((data) => {
        console.log('data', data);
        setUserCharacters(data.data.charactersByUser);
      });
    }
  }, [query]);

  const updateFilters = (filters: GetUserCharactersQueryParameters) => {
    setCurrentFilters(filters);
  };

  const selectUserCharacter = (userCharacter: UserCharacter) => {
    setSelectedUserCharacter(userCharacter);
  };

  return (
    <RickAndMortyContext.Provider
      value={{
        updateFilters,
        userCharacters,
        selectedUserCharacter,
        selectUserCharacter,
      }}
    >
      {children}
    </RickAndMortyContext.Provider>
  );
};
