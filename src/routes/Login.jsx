import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../redux/user/actions';
import { hashPassword } from '../utils/validation';

/* PASWORDS:
1. Sincere@april.biz: zo[z-NK1
2. Shanna@melissa.tv: X_&1j,v2o[H
3. Nathan@yesenia.net: 3Fpubh9|
4. Julianne.OConner@kory.org: u[3p4iS,=6on
5. Lucio_Hettinger@annie.ca: w!cZ8w[=8
6. Karley_Dach@jasper.info: )mM*6@j[Lv
7. Telly.Hoeger@billy.biz: K0|FDbQE;v
8. Sherwood@rosamond.me: pp^56!0;^Q
9. Chaim_McDermott@dana.io: !5T{[I8UKvDG
10. Rey.Padberg@karina.biz: xb#YDG4odp-E
11. top123@mail.com: aA34!678
12. test@mail.com: 123123Aa
*/

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(getUser({ email, password: await hashPassword(password) })).then(
      () => navigate('/'),
      (err) => setError(err?.toString())
    );
  };

  return (
    <>
      <header className='p-4 underline text-2xl'>
        <Link to='/signUp'>SignUp</Link>
      </header>
      <div className='flex flex-col gap-8 w-1/3 border-4 mx-[auto] items-center mt-12 py-12 text-3xl rounded-md'>
        <h1>Login</h1>
        <form
          onSubmit={handleLogin}
          className='flex flex-col text-2xl items-center'
        >
          <input
            type='text'
            value={email}
            placeholder='email'
            onChange={(ev) => setEmail(ev.target.value)}
            className='border-[0.2rem] my-2 rounded p-2'
          />
          <input
            type='password'
            value={password}
            placeholder='password'
            onChange={(ev) => setPassword(ev.target.value)}
            className='border-[0.2rem] mt-2 mb-12 rounded p-2'
          />
          {error && <div className='text-red-500 mb-4'>Error: {error}</div>}
          <button type='submit' className='bg-slate-300 px-12 py-2 rounded'>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
