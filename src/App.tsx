import './App.css'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import { ConfigProvider } from 'antd'

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#242edb'
        }
      }}>
      <ProductsPage />
    </ConfigProvider>
  )
}

export default App
