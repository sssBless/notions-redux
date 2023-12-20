import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './routes/Login';
import Auth from './auth/Auth';
import { Layout } from './components/Layout';
import Notes from './routes/Notes';
import Note from './routes/Note';
import Home from './routes/Home';
import { Edit } from './routes/Edit';
import { Create } from './routes/Create';
import { NotFound } from './routes/NotFound';
import { ErrorPage } from './routes/ErrorPage';
import { SignUp } from './routes/SignUp';
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/',
    element: (
      <Auth>
        <Layout />
      </Auth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'notes',
        element: <Notes />,
      },
      {
        path: 'notes/:id',
        element: <Note />,
      },
      {
        path: 'notes/:id/edit',
        element: <Edit />,
      },
      {
        path: 'notes/new',
        element: <Create />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading..</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
