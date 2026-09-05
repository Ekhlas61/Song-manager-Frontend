import { Provider } from 'react-redux';
import { store } from './store';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Layout />
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        newestOnTop
        limit={1}
      />
    </Provider>
  );
}