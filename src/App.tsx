import { Provider } from 'react-redux';
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import { ConfigProvider } from 'antd'
import { store } from './store';

function App() {

  return (
    <Provider store={store}>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#242edb'
        }
      }}>
      <LoginPage />
    </ConfigProvider>
    </Provider>
  )
}

export default App
