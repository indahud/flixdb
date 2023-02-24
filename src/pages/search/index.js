import axios from 'axios';

export default function SearchList({ data }) {
  return (
    <>
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
                      <a
                        className="no-underline hover:underline text-black"
                        href="#"
                      >
                        {list.title}
                      </a>
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
                    <p className="rounded-full bg-green-200 p-1 text-sm">
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
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const params = {
      query: ctx.query.query,
    };
    const API_URL = 'http://localhost:1337/search';

    const { data } = await axios.post(API_URL, params);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
