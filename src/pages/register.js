import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function SignUpForm() {
  const router = useRouter();
  const [registerStatus, setRegisterStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ username, email, age, password }) => {
    try {
      const BASE_URL = 'http://localhost:1337/user/';
      const { data } = await axios.post(BASE_URL, {
        username,
        email,
        age,
        password,
      });
      console.log('data', data);
      if (data) {
        setRegisterStatus(true);
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username</label>
                <input type="text" {...register("username")} />

                <label>Email</label>
                <input type="text" {...register("email")} />

                <label>Password</label>

                <input type="password" {...register("password")} />

                <label>Age</label>

                <input type="text" {...register("age")} />

                <button type="submit">Submit</button>
            </form> */}

      <div className="overflow-hidden">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="flex mx-auto border rounded">
              <div className="relative">
                <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Register
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
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        Email
                      </label>
                      <input
                        placeholder="Email"
                        type="email"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <div>
                          <p className="text-red-500">Email is required</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="age"
                        className="inline-block mb-1 font-medium"
                      >
                        Age
                      </label>
                      <input
                        placeholder="Age"
                        type="number"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="age"
                        name="age"
                        {...register('age', { required: true })}
                      />
                      {errors.age && (
                        <div>
                          <p className="text-red-500">Age is required</p>
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
                        {registerStatus ? 'Success' : 'Register'}
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
