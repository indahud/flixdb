import axios from 'axios';

export default function GetMoviesorTvWithId({ data }) {
  return (
    <>
      {data && (
        <main className="py-10 h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Details
            </h1>
          </div>
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2 border rounded">
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {data.title === '' ? 'NA' : data.title}
                    </h2>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500  ">
                            Release Year
                          </dt>
                        </div>

                        <dd className="mt-1 text-sm text-gray-900">
                          {data.release_year === '' ? 'NA' : data.release_year}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500">
                            Type
                          </dt>
                        </div>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data.type === '' ? 'NA' : data.type}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500">
                            Rating
                          </dt>
                        </div>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data.rating === '' ? 'NA' : data.rating}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500">
                            Categories
                          </dt>
                        </div>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data.listed_in === '' ? 'NA' : data.listed_in}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <article className="prose max-w-none mt-4 py-5 sm:px-6">
                      {data.description === '' ? 'NA' : data.description}
                    </article>
                  </div>
                </div>
              </section>
            </div>
            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 border">
                <h2
                  id="timeline-title"
                  className="border-b text-lg font-medium text-gray-900 mb-2"
                >
                  Details
                </h2>
                <div className="flex items-center mb-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Cast
                  </dt>
                </div>
                {data.cast === '' ? 'NA' : data.cast}

                <div className="flex items-center mb-1 mt-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Director
                  </dt>
                </div>
                <div className="mt-1 space-x-3 flex items-center">
                  <span className="text-sm font-medium">
                    {data.director === '' ? 'NA' : data.director}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export async function getServerSideProps(context, res) {
  try {
    const { _id } = context.query;
    const URL = `http://localhost:1337/single/${_id}`;
    const result = await axios.get(URL);

    return {
      props: {
        data: result.data,
      },
    };
  } catch (error) {
    // res.statusCode = 404;
    return {
      props: {},
    };
  }
}
