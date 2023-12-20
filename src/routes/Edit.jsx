import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { selectUserId } from '../redux/user/selectors';
import { updateNote } from '../redux/notes/actions';
import { Api } from '../utils/Api';

export function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const notes = await Api.getNote(id, userId);
      if (!notes[0]) navigate('/error');
      setBody(notes[0].body);
      setTitle(notes[0].title);
    };
    fetchData();
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (title.trim() === title && body.trim() === body) {
      dispatch(updateNote({ id, userId, title, body }));
      navigate(`/notes/${id}`);
      setError('');
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
      <form onSubmit={handleSave} className='flex flex-col text-3xl w-full'>
        <input
          type='text'
          placeholder='Title...'
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
          className='border-[0.2rem] my-6 rounded p-2'
        />
        <textarea
          cols={50}
          rows={10}
          type='text'
          placeholder='Body...'
          value={body}
          onChange={(ev) => setBody(ev.target.value)}
          required
          className='border-[0.2rem] rounded p-2 mb-6'
        />
        {error && <div className='text-red-500'>Error: {error}</div>}
        <div className='flex justify-center mt-8'>
          <button type='submit' className='bg-slate-300 px-12 py-2 rounded'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
