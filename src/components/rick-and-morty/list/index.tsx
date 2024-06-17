import { RickAndMortyListItem } from '@/components/rick-and-morty/list/list-item';
import { useRickAndMorty } from '@/contexts/rick-and-morty-context';
import { Gender, Status, UserCharacter } from '@/types/character';
import { useMemo } from 'react';

export const RickAndMortyList = () => {
  const { userCharacters, selectUserCharacter } = useRickAndMorty();

  const favoritesCharacters = useMemo(
    () => userCharacters.filter(({ isFavorite }) => isFavorite),
    [userCharacters]
  );
  const availableCharacters = useMemo(
    () => userCharacters.filter(({ isFavorite }) => !isFavorite),
    [userCharacters]
  );

  const handleSelectUserCharacter = (userCharacter: UserCharacter) => {
    selectUserCharacter(userCharacter);
  };

  return (
    <div className=' py-10 divide-y'>
      <p className='text-xs font-semibold text-[#6B7280] pl-3 tracking-wider pb-5'>
        {`STARRED CHARACTERS (${favoritesCharacters.length})`}
      </p>
      <div className='flex flex-col divide-y-2 '>
        {favoritesCharacters.map((userCharacter) => (
          <div
            key={userCharacter.id}
            onClick={() => {
              handleSelectUserCharacter(userCharacter);
            }}
          >
            <RickAndMortyListItem {...userCharacter.character} isFavorite />
          </div>
        ))}
      </div>
      <p className='text-xs font-semibold text-[#6B7280] pl-3 tracking-wider py-5'>
        {`CHARACTERS (${availableCharacters.length})`}
      </p>
      <div className='flex flex-col divide-y-2 '>
        {availableCharacters.map((userCharacter) => (
          <div
            key={userCharacter.id}
            onClick={() => {
              handleSelectUserCharacter(userCharacter);
            }}
          >
            <RickAndMortyListItem {...userCharacter.character} />
          </div>
        ))}
      </div>
    </div>
  );
};
