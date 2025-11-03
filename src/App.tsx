
import './App.css'
import PasswordGenerator from './components/PasswordGenerator'

function App() {

  return (
    <>
     <div className="app-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="content-container">
        <h1 className="text-center mb-4">Generador de Contraseñas 🔐</h1>
        <PasswordGenerator />
      </div>
    </div>
    </>
  )
}

export default App
