import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from '../utils/Api';
import { deleteNote } from '../redux/notes/actions';
import { selectUserId } from '../redux/user/selectors';

import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

function Note() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteNote = () => {
    dispatch(deleteNote(id));
    navigate('/notes');
  };

  useEffect(() => {
    const fetchNote = async () => {
      const notes = await Api.getNote(id, userId);
      if (!notes[0]) navigate('/error');
      setNote(notes[0]);
    };
    fetchNote();
  }, [id]);

  return (
    <div className='flex flex-col p-16 text-4xl items-center w-5/12'>
      <div className='flex justify-between w-full mb-24'>
        <Link to={'/notes'} className='bg-slate-300 px-12 py-2 rounded w-1/8'>
          Back
        </Link>
        <span className='flex w-28 justify-between'>
          <Link to={'edit'}>
            <FaRegEdit />
          </Link>
          <Link onClick={handleDeleteNote}>
            <AiOutlineDelete />
          </Link>
        </span>
      </div>
      <>
        <div className='text-4xl mb-4'>{note?.title}</div>
        <div className='text-4xl mb-4'>{note?.body}</div>
      </>
    </div>
  );
}

export default Note;
