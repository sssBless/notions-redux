import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../redux/user/selectors';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { addNote } from '../redux/notes/actions';

export function Create() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    if (title.trim() === title && body.trim() === body) {
      const id = nanoid();
      dispatch(addNote({ id, userId, title, body }));
      navigate(`/notes/${id}`);
    } else {
      setError(
        "Fields can't be empty or consisting only whitespaces(or started/ended by whitespaces)"
      );
    }
  };

  return (
    <div className='text-3xl flex flex-col w-2/5 items-start mt-8'>
      <Link to={'/notes'} className='bg-slate-300 px-12 py-2 rounded w-1/8'>
        Back
      </Link>
      <form onSubmit={handleCreate} className='flex flex-col text-3xl w-full'>
        <input
          type='text'
          placeholder='Title...'
          onChange={(ev) => setTitle(ev.target.value)}
          required
          col={50}
          className='border-[0.2rem] my-6 rounded p-2'
        />
        <textarea
          cols={50}
          rows={10}
          type='text'
          placeholder='Body...'
          onChange={(ev) => setBody(ev.target.value)}
          required
          className='border-[0.2rem] rounded p-2 mb-6'
        />
        {error && <div className='text-red-500'>Error: {error}</div>}
        <div className='flex justify-center mt-8'>
          <button type='submit' className='bg-slate-300 px-12 py-2 rounded'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
