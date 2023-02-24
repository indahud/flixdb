import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useState } from 'react';
import Link from 'next/link';


export default function Home({ data, page }) {
  const [search, setSearch] = useState(null);
  const router = useRouter();

  const ChangeHandler = (event) => {
    setSearch(event.target.value);
  };


  const ButtonHandler = (event) => {
    event.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <>
      <main>
        <div className="flex justify-center items-center mt-7 mb-4">
          <form onSubmit={ButtonHandler}>
            <input 
              type="text" 
              placeholder='Search' 
              onChange={ChangeHandler}
              className="px-4 py-3 transition duration-200 bg-white border border-gray-500 rounded shadow-lg focus:ring-2 focus:ring-indigo-accent-400 focus:outline-none"
            />
            <button 
              className="px-4 py-3 border border-gray-500 rounded ml-2" 
              type='submit'
            >Search</button>
          </form>

        </div>
        
        <div className='flex mt-2 mb-0'>
          <div className='flex mx-auto'>
            <div className='button rounded bg-rose-500 p-2 text-white text-base font-semibold mr-2 cursor-pointer' onClick={() => router.push(`/data/movies`)}>Movies</div>
            <div className='button rounded bg-violet-500 p-2 text-white text-base font-semibold cursor-pointer' onClick={() => router.push(`/data/tv`)}>TV Shows</div>
          </div> 
        </div>
      </main>

      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {data &&
            data.map((list) => (
              <div
                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                key={list._id}
              >
                <article className="overflow-hidden rounded-xl shadow-lg border border-gray-300">
                  <header className="border-b-2 border-gray-100 flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                    <Link href={`/data/${list._id}`} className="no-underline hover:underline text-black">
                          {list.title}
                      </Link>
                    </h1>
                    <p className="text-white-darker text-sm rounded bg-slate-400 p-1">
                      {list.date_added}
                    </p>
                  </header>
                  <p className="p-3 border-b-2 border-gray-100">
                    {list.description}
                  </p>
                  <div className="border-b-2 border-gray-100 flex items-center justify-between leading-tight p-2 md:p-4">
                    <h4 className="text-sm rounded border border-slate-500 p-1">
                      {list.rating}
                    </h4>
                    <p className="rounded-full bg-green-200 pl-2 pr-2 pt-1 pb-1 text-sm">
                      {list.duration}
                    </p>
                  </div>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <p className="text-sm">/ {list.listed_in}</p>
                  </footer>
                </article>
              </div>
            ))}
        </div>
      </div>
      <button
        className="btn bg-blue-500 rounded text-white p-2 flex mx-auto mb-2"
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Load more
      </button>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { age } = nookies.get(ctx);
    const page = ctx?.query?.page || 1;

    if (age < 18) {
      const API_URL = `http://localhost:1337/all/y/${+page}`;
      const result = await axios.get(API_URL);

      return {
        props: {
          data: result.data,
          page: +page,
        },
      };
    } else {
      const API_URL = `http://localhost:1337/all/n/${+page}`;
      const result = await axios.get(API_URL);
      return {
        props: {
          data: result.data,
          page: +page,
        },
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
}
