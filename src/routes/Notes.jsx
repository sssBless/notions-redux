import { useDispatch, useSelector } from 'react-redux';
import { selectNotes } from '../redux/notes/selectors';
import { useEffect } from 'react';
import { deleteNote, getNotes } from '../redux/notes/actions';
import { selectUserId } from '../redux/user/selectors';
import { Link } from 'react-router-dom';
import { getNoteDate } from '../utils/getDate';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { GoPlusCircle } from 'react-icons/go';

export default function Notes() {
  const authorId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(authorId)).catch(console.log);
  }, [authorId]);

  const notes = useSelector(selectNotes).sort(
    (a, b) => b.createAt - a.createAt
  );

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id)).catch(console.log);
  };

  return (
    <div className='text-3xl flex flex-col w-full items-center mt-8'>
      <div className='w-4/6 mb-6 flex items-center'>
        <Link to={'/'} className='mr-96 bg-slate-300 px-12 py-2 rounded w-1/8'>
          Back
        </Link>
        <Link
          to={'new'}
          className='bg-slate-300 px-6 py-2 rounded w-1/6 flex flex-row justify-center items-center'
        >
          Create <GoPlusCircle className='ml-6' />
        </Link>
      </div>
      <ul className='w-4/6'>
        {!!notes.length &&
          notes.map((note) => (
            <li
              key={note.id}
              className=' bg-slate-200 text-2xl flex flex-row justify-between my-4 items-center p-2 rounded'
            >
              <Link to={`${note.id}`} className=''>
                <div className='p-2 flex justify-between w-96'>
                  <span>{note.title}</span>
                  <span>{getNoteDate(note.createAt)}</span>
                </div>
              </Link>

              <span className='flex justify-between w-40 items-center'>
                <Link to={`/notes/${note.id}/edit`}>
                  <FaRegEdit />
                </Link>

                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className='mx-10'
                >
                  <AiOutlineDelete />
                </button>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
