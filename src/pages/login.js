import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [userLogin, setUserLogin] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const BASE_URL = 'http://localhost:1337/user/';
  const onSubmit = async ({ username, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      if (response.data.code === 'Success') {
        const getUserDetails = await axios.get(
          `${BASE_URL}/details/${username}`
        );
        // const userAge = localStorage.setItem('userAge', getUserDetails.data.age)
        setCookie(null, 'age', getUserDetails.data.age, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        setUserLogin(true);
        router.push('/data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input type="text" {...register("username", { required: true })} />
                {errors.username &&(
                    <div>
                        <p className="text-red-500">This field is required</p>
                    </div>
                )}
                <label>Password</label>

                <input type="password" {...register("password", { required: true })} />
                {errors.password &&(
                    <div>
                        <p className="text-red-500">This field is required</p>
                    </div>
                )}    
                <button type="submit">Submit</button>
                <Toaster />
            </form> */}
      <div className="overflow-hidden">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="flex mx-auto border rounded">
              <div className="relative">
                <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Login
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="username"
                        className="inline-block mb-1 font-medium"
                      >
                        Username
                      </label>
                      <input
                        placeholder="Username"
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        {...register('username', { required: true })}
                      />
                      {errors.password && (
                        <div>
                          <p className="text-red-500">Username is required</p>
                        </div>
                      )}
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="password"
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <input
                        placeholder="password"
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        {...register('password', { required: true })}
                      />
                      {errors.password && (
                        <div>
                          <p className="text-red-500">Password is required</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      >
                        {userLogin ? 'Sucess' : 'Login'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
