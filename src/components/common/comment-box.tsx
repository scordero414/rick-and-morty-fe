import { useRickAndMorty } from '@/contexts/rick-and-morty-context';
import React, { useState } from 'react';

export const CommentBox = ({
  onAddComment,
}: {
  onAddComment: (comment: string) => void;
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onAddComment(comment);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 pt-5'>
      <textarea
        placeholder='Leave a comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='border p-2 w-full resize-none'
        rows={3}
      ></textarea>
      <button
        type='submit'
        className='bg-[#8054C7] text-white px-4 py-2 rounded'
      >
        Submit
      </button>
    </form>
  );
};
