import { RickAndMortyListItem } from '@/components/rick-and-morty/list/list-item';
import { Character, Gender, Status, UserCharacter } from '@/types/character';
import { useMemo } from 'react';

export const RickAndMortyList = () => {
  const characters: UserCharacter[] = useMemo(
    () => [
      {
        id: '1',
        isFavorite: true,
        character: {
          id: '136',
          name: 'Rick Sanchez',
          status: 'Alive' as Status,
          species: 'Human',
          type: '',
          gender: 'Male' as Gender,
          origin: 'Earth (C-137)',
          location: 'Citadel of Ricks',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      },
    ],
    []
  );

  const favoritesCharacters = useMemo(
    () => characters.filter(({ isFavorite }) => isFavorite),
    [characters]
  );
  const availableCharacters = useMemo(
    () => characters.filter(({ isFavorite }) => !isFavorite),
    [characters]
  );

  return (
    <div className=' py-10 divide-y'>
      <p className='text-xs font-semibold text-[#6B7280] pl-3 tracking-wider pb-5'>
        {`STARRED CHARACTERS (${favoritesCharacters.length})`}
      </p>
      <div className='flex flex-col divide-y-2 '>
        {favoritesCharacters.map(({ character }) => (
          <RickAndMortyListItem key={character.id} {...character} isFavorite />
        ))}
      </div>
      <p className='text-xs font-semibold text-[#6B7280] pl-3 tracking-wider py-5'>
        {`CHARACTERS (${availableCharacters.length})`}
      </p>
      <div className='flex flex-col divide-y-2 '>
        {availableCharacters.map(({ character }) => (
          <RickAndMortyListItem key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
};
