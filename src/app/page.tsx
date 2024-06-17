'use client';

import { SearchInput } from '@/components/common/search-input';
import { RickAndMortyItemDetails } from '@/components/rick-and-morty/item-details';
import { RickAndMortyList } from '@/components/rick-and-morty/list';

export default function Home() {
  return (
    <div className='flex h-screen'>
      <div className='w-1/3 px-3 py-10 overflow-y-scroll'>
        <h1 className='text-xl font-normal mb-4 '>Rick and Morty list</h1>
        <SearchInput />
        <RickAndMortyList />
      </div>
      <div className='flex w-full  pt-10'>
        <RickAndMortyItemDetails />
      </div>
    </div>
  );
}
