import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartSummary from './components/CartSummary'
import './App.css'

function App() {
  const [view, setView] = useState('products'); // 'products' or 'cart'

  return (
    <div className="app-wrapper">
      <Navbar setView={setView} />
      <main className="container py-4">
        {view === 'products' ? <ProductList /> : <CartSummary setView={setView} />}
      </main>
    </div>
  )
}

export default App
