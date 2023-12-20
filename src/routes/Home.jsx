import { connect } from 'react-redux';
import { getDate } from '../utils/getDate';

function Home(props) {
  const { email, name, username, registrationDate, surname } =
    props?.user?.data;
  console.log('USER > ', props.user);
  return (
    <div className='flex flex-col p-16 text-4xl items-center'>
      <h1 className='font-semibold text-5xl pb-4'>About me</h1>
      <div className='py-3'>
        <span className='font-semibold'>Name:</span> {name}
      </div>
      <div className='py-3'>
        <span className='font-semibold'>Surname:</span> {surname}
      </div>
      <div className='py-3'>
        <span className='font-semibold'>Username:</span> {username}
      </div>
      <div className='py-3'>
        <span className='font-semibold'>Email:</span> {email}
      </div>
      <div className='py-3'>
        <span className='font-semibold'>Date of registration:</span>{' '}
        {getDate(registrationDate)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Home);
