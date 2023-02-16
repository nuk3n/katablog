import App from './components/app';
import { store, persistor } from './store/index';
import LoadingIndicator from './components/loadingIndicator';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
