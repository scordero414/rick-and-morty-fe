import { CommentBox } from '@/components/common/comment-box';
import { StarredIcon } from '@/components/common/starred-icon';
import {
  callGraphqlApi,
  useRickAndMorty,
} from '@/contexts/rick-and-morty-context';
import { Gender, Status, UserCharacter } from '@/types/character';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

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
  const { selectedUserCharacter, deleteCharacter, addCommentToCharacter } =
    useRickAndMorty();

  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    if (selectedUserCharacter.id) {
      callGraphqlApi(`
      query CommentsByUserCharacter {
        commentsByUserCharacter(userCharacterId: ${selectedUserCharacter.id}) {
            commentText
        }
      }
      `).then((data) => {
        console.log(data);

        const newComments = data.data.commentsByUserCharacter.map(
          (c: { commentText: string }) => c.commentText
        );
        console.log(newComments);
        setComments(newComments);
      });
    }
  }, [selectedUserCharacter.id]);

  if (!selectedUserCharacter.id) return null;

  const { id, name, image, ...character } = selectedUserCharacter?.character;

  const handleDeleteCharacter = () => {
    deleteCharacter(selectedUserCharacter.id);
  };

  const handleAddComment = (comment: string) => {
    addCommentToCharacter(selectedUserCharacter.id, comment);
    setComments((prev) => [...prev, comment]);
  };

  return (
    <div className='flex flex-col  space-y w-full px-20'>
      <div className='flex justify-between items-center'>
        <div className='w-[75px] h-[75px] rounded-full'>
          <div className='relative w-[75px] h-[75px]'>
            <Image
              src={image}
              alt='Character Avatar'
              className='object-cover rounded-full'
              width={75}
              height={75}
            />
            <div className='absolute bottom-0 right-[-10px]'>
              <StarredIcon
                userCharacterId={selectedUserCharacter.id}
                isFavorite={selectedUserCharacter.isFavorite}
              />
            </div>
          </div>
        </div>
        <button
          type='button'
          className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
          onClick={handleDeleteCharacter}
        >
          Soft Delete
        </button>
      </div>
      <h1 className='text-2xl font-bold mt-3'>{name}</h1>

      <div className='flex flex-col divide-y-2 '>
        {Object.keys(character).map((key) => (
          <RickAndMortyListItem
            key={key}
            name={key}
            value={character[key as keyof typeof character]}
          />
        ))}
      </div>

      <CommentBox onAddComment={handleAddComment} />

      <div className='mt-5'>
        {comments.map((comment, index) => (
          <div key={index} className='bg-gray-100 p-3 rounded-lg'>
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};
