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

export const callGraphqlApi = async (query: string) => {
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

const RickAndMortyContext = createContext({
  selectedUserCharacter: {} as UserCharacter,
  selectUserCharacter: (userCharacter: UserCharacter) => {},
  updateFilters: (filters: GetUserCharactersQueryParameters) => {},
  userCharacters: [] as UserCharacter[],
  refetchCharacters: () => {},
  changeFavorite: (userCharacterId: string, isFavorite: boolean) => {},
  deleteCharacter: (userCharacterId: string) => {},
  addCommentToCharacter: (userCharacterId: string, comment: string) => {},
});

export const useRickAndMorty = () => useContext(RickAndMortyContext);

export const RickAndMortyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUserCharacter, setSelectedUserCharacter] =
    useState<UserCharacter>({} as UserCharacter);

  const [currentFilters, setCurrentFilters] =
    useState<GetUserCharactersQueryParameters>({
      userId: Number(process.env.NEXT_PUBLIC_CURRENT_SELECTED_USER),
    });

  const buildCharactersQuery = (filters: GetUserCharactersQueryParameters) => {
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

  const charactersQuery = useMemo(
    () => buildCharactersQuery(currentFilters),
    [currentFilters]
  );

  const [userCharacters, setUserCharacters] = useState<UserCharacter[]>([]);

  useEffect(() => {
    if (charactersQuery) {
      callGraphqlApi(charactersQuery).then((data) => {
        setUserCharacters(data.data.charactersByUser);
      });
    }
  }, [charactersQuery]);

  const updateFilters = (filters: GetUserCharactersQueryParameters) => {
    setCurrentFilters(filters);
  };

  const selectUserCharacter = (userCharacter: UserCharacter) => {
    setSelectedUserCharacter(userCharacter);
  };

  const refetchCharacters = () => {
    callGraphqlApi(charactersQuery).then((data) => {
      setUserCharacters(data.data.charactersByUser);
      if (selectedUserCharacter?.id) {
        const selectedCharacter = data.data.charactersByUser.find(
          (c: UserCharacter) => c.id === selectedUserCharacter.id
        );
        selectUserCharacter(selectedCharacter);
      }
    });
  };

  const changeFavorite = (userCharacterId: string, isFavorite: boolean) => {
    callGraphqlApi(`
      mutation ChangeCharacterFavorite {
        changeCharacterFavorite(userCharacterId: ${userCharacterId}, isFavorite: ${isFavorite})
    }
    `).then(() => {
      refetchCharacters();
    });
  };

  const deleteCharacter = (userCharacterId: string) => {
    callGraphqlApi(`
      mutation SoftDeleteUserCharacter {
        softDeleteUserCharacter(userCharacterId: ${userCharacterId})
      }
    `).then(() => {
      refetchCharacters();
    });
  };

  const addCommentToCharacter = (userCharacterId: string, comment: string) => {
    callGraphqlApi(`
      mutation AddComment {
        addComment(userCharacterId: ${userCharacterId}, commentText: "${comment}") {
            id
        }
      }
    `).then(() => {
      console.log('Comment added');
    });
  };

  return (
    <RickAndMortyContext.Provider
      value={{
        updateFilters,
        userCharacters,
        selectedUserCharacter,
        selectUserCharacter,
        refetchCharacters,
        changeFavorite,
        deleteCharacter,
        addCommentToCharacter,
      }}
    >
      {children}
    </RickAndMortyContext.Provider>
  );
};
