import { StarredIcon } from '@/components/common/starred-icon';
import { Character } from '@/types/character';

import Image from 'next/image';

interface RickAndMortyListItemProps extends Character {
  isFavorite?: boolean;
}

export const RickAndMortyListItem = ({
  name,
  species,
  image,
  isFavorite,
}: RickAndMortyListItemProps) => {
  return (
    <div className='flex flex-row pl-2 justify-center bg-[#EEE3FF] rounded h-[74px]'>
      <div className='flex items-center space-x-4'>
        <div className='w-[32px] h-[32px] bg-gray-300 rounded-full overflow-hidden'>
          <Image
            src={image}
            alt='Avatar Image'
            className='w-full h-full object-cover'
            width={32}
            height={32}
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <p className='text-sm text-gray-500'>{species}</p>
        </div>
      </div>
      <div className='ml-auto mr-2 content-center'>
        <StarredIcon isFavorite={isFavorite} />
      </div>
    </div>
  );
};
