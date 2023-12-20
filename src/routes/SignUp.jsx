import { Api } from '../utils/Api';
import { z } from 'zod';
import { hashPassword, userSchema } from '../utils/validation';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SignUp() {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, email, surname, username, password, confirmPassword } =
      ev.target;

    handleProcessingUser({
      name: name.value,
      email: email.value,
      surname: surname.value,
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  };

  const handleProcessingUser = async (user) => {
    const { email, password, confirmPassword, surname, name, username } = user;
    try {
      const validUser = userSchema.parse({
        email,
        password,
        confirmPassword,
        registrationDate: Date.now(),
      });
      validUser.password = await hashPassword(password);

      addUser({
        surname,
        name,
        username,
        email,
        registrationDate: validUser.registrationDate,
        password: validUser.password,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({ ...err.format(), ...errors });
      }
    }
  };

  const addUser = async (user) => {
    console.log('USER > ', user);
    if (!(await Api.checkUser(user.email))) {
      Api.addUser(user)?.catch((err) => console.log(err));
      setErrors(null);
      navigate('/login', { replace: true });
    } else {
      setErrors({
        ...errors,
        exist_msg: 'A user with this email address already exists',
      });
    }
  };

  return (
    <>
      <header className='p-4 underline text-2xl'>
        <Link to='/login'>Login</Link>
      </header>
      <div className='flex flex-col gap-8 w-1/3 border-4 mx-[auto] items-center mt-12 py-12 text-3xl rounded-md'>
        <h1>Sign up</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col text-2xl items-center'
        >
          <input
            type='text'
            placeholder='name'
            name='name'
            required
            className='border-[0.2rem] my-2 rounded p-2 w-96'
          />
          <input
            type='text'
            placeholder='surname'
            name='surname'
            required
            className='border-[0.2rem] my-2 rounded p-2 w-96'
          />
          <input
            type='text'
            placeholder='username'
            name='username'
            required
            className='border-[0.2rem] my-2 rounded p-2 w-96'
          />
          <input
            type='email'
            placeholder='email'
            name='email'
            className='border-[0.2rem] my-2 rounded p-2 w-96'
          />
          {errors?.email && (
            <div className='text-xl mb-[1rem] text-red-500'>
              Error: {errors?.email?._errors}
            </div>
          )}
          <input
            type='password'
            placeholder='password'
            name='password'
            className='border-[0.2rem] my-2 rounded p-2 w-96'
          />
          <input
            type='password'
            placeholder='confirm password'
            name='confirmPassword'
            className='border-[0.2rem] my-2 rounded p-2 w-96'
          />
          <div className='text-red-500 mb-4 text-xl'>
            {errors?.password && (
              <>
                {errors?.password?._errors.map((err) => (
                  <div key={err}>Error: {err}</div>
                ))}
              </>
            )}
            {errors?.passwd_msg && <div>Error: {errors?.passwd_msg}</div>}
            {errors?.exist_msg && <div>Error: {errors?.exist_msg}</div>}
            {errors?.confirmPassword && (
              <div>Error: {errors?.confirmPassword?._errors}</div>
            )}
            {errors?.usr_error && <div>Error: {errors?.usr_error}</div>}
          </div>
          <button type='submit' className='bg-slate-300 px-12 py-2 rounded'>
            Click
          </button>
        </form>
      </div>
    </>
  );
}
