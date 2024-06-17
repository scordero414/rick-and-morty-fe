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
        {isFavorite ? (
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='32' height='32' rx='16' fill='white' />
            <path
              d='M8.31802 10.318C6.56066 12.0754 6.56066 14.9246 8.31802 16.682L16.0001 24.364L23.682 16.682C25.4393 14.9246 25.4393 12.0754 23.682 10.318C21.9246 8.56066 19.0754 8.56066 17.318 10.318L16.0001 11.6361L14.682 10.318C12.9246 8.56066 10.0754 8.56066 8.31802 10.318Z'
              fill='#53C629'
              stroke='#53C629'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        ) : (
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='32' height='32' rx='16' fill='white' />
            <path
              d='M8.31802 10.318C6.56066 12.0754 6.56066 14.9246 8.31802 16.682L16.0001 24.364L23.682 16.682C25.4393 14.9246 25.4393 12.0754 23.682 10.318C21.9246 8.56066 19.0754 8.56066 17.318 10.318L16.0001 11.6361L14.682 10.318C12.9246 8.56066 10.0754 8.56066 8.31802 10.318Z'
              stroke='#D1D5DB'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        )}
      </div>
    </div>
  );
};
