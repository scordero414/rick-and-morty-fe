import { StarredIcon } from '@/components/common/starred-icon';
import { Character, Gender, Status, UserCharacter } from '@/types/character';
import Image from 'next/image';

const RickAndMortyListItem = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <div className='py-3'>
      <h3 className='text-lg font-semibold capitalize'>{name}</h3>
      <p className='text-sm text-gray-500'>{value || 'None'}</p>
    </div>
  );
};

export const RickAndMortyItemDetails = () => {
  const userCharacter: UserCharacter = {
    id: '1',
    isFavorite: true,
    character: {
      id: '136',
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive' as Status,
      type: '',
      gender: 'Male' as Gender,
      origin: 'Earth (C-137)',
      location: 'Citadel of Ricks',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
  };

  const { id, name, image, ...character } = userCharacter.character;

  return (
    <div className='flex flex-col  space-y w-full px-20'>
      <div className='w-[75px] h-[75px] rounded-full'>
        <div className='relative w-[75px] h-[75px]'>
          <Image
            src='https://rickandmortyapi.com/api/character/avatar/1.jpeg'
            alt='Character Avatar'
            className='object-cover rounded-full'
            width={75}
            height={75}
          />
          <div className='absolute bottom-0 right-[-10px]'>
            <StarredIcon isFavorite={true} />
          </div>
        </div>
      </div>
      <h1 className='text-2xl font-bold'>Rick Sanchez</h1>

      <div className='flex flex-col divide-y-2 '>
        {Object.keys(character).map((key) => (
          <RickAndMortyListItem
            key={key}
            name={key}
            value={character[key as keyof typeof character]}
          />
        ))}
      </div>
    </div>
  );
};
