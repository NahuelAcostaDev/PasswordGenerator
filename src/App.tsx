import { useState } from 'react'
import './App.css'
import PasswordGenerator from './components/PasswordGenerator'

function App() {

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Generador de Contraseñas 🔐</h1>
      <PasswordGenerator />
    </div>
    </>
  )
}

export default App
