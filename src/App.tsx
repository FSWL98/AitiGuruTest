import { Provider } from 'react-redux';
import './App.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { router } from './router';

function App() {

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#242edb'
          }
        }}>
          <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  )
}

export default App
