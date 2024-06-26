import { useRickAndMorty } from '@/contexts/rick-and-morty-context';

export const StarredIcon = ({
  isFavorite,
  userCharacterId,
}: {
  isFavorite?: boolean;
  userCharacterId: string;
}) => {
  const { changeFavorite } = useRickAndMorty();

  const handleFavorite = () => {
    changeFavorite(userCharacterId, !isFavorite);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleFavorite();
      }}
    >
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
  );
};
