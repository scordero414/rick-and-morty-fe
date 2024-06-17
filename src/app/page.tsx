import { SearchInput } from '@/components/common/search-input';
import { RickAndMortyList } from '@/components/rick-and-morty/list';

export default function Home() {
  return (
    <div className='flex h-screen'>
      <div className='w-1/3 px-3 py-10'>
        <h1 className='text-xl font-normal mb-4 '>Rick and Morty list</h1>
        <SearchInput />
        <RickAndMortyList />
      </div>
      <div className='flex w-full bg-red-500 pl-24 pt-10'>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold mb-4'>Rick and Morty Item</h1>
        </div>
      </div>
    </div>
  );
}
