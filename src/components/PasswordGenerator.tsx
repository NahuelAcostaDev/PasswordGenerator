import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PasswordDisplay from './PasswordDisplay'
import '../styles/PG.css'

type SavedData = {
  password: string
  length: number
  includeUppercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  remember: boolean
}

const STORAGE_KEY = 'generador-contraseñas:v1'

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed: Partial<SavedData> = JSON.parse(raw)
      if (parsed.remember) {
        if (typeof parsed.password === 'string') setPassword(parsed.password)
        if (typeof parsed.length === 'number') setLength(parsed.length)
        if (typeof parsed.includeUppercase === 'boolean') setIncludeUppercase(parsed.includeUppercase)
        if (typeof parsed.includeNumbers === 'boolean') setIncludeNumbers(parsed.includeNumbers)
        if (typeof parsed.includeSymbols === 'boolean') setIncludeSymbols(parsed.includeSymbols)
        setRemember(true)
      }
    } catch (err) {
      console.warn('No se pudo leer localStorage:', err)
    }
  }, [])
  useEffect(() => {
    try {
      if (!remember) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }
      const toSave: SavedData = {
        password,
        length,
        includeUppercase,
        includeNumbers,
        includeSymbols,
        remember,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (err) {
      console.warn('No se pudo escribir en localStorage:', err)
    }
  }, [password, length, includeUppercase, includeNumbers, includeSymbols, remember])

  const generatePassword = () => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberChars = '0123456789'
    const symbolChars = '!@#$%^&*()_-+=<>?'

    let charset = lowerChars
    if (includeUppercase) charset += upperChars
    if (includeNumbers) charset += numberChars
    if (includeSymbols) charset += symbolChars

    if (!charset.length) return setPassword('')

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      newPassword += charset[randomIndex]
    }
    setPassword(newPassword)
  }

  const forgetSaved = () => {
    setRemember(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="card p-4 shadow">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Largo: {length}</Form.Label>
          <Form.Range
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          label="Incluir mayúsculas"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
        <Form.Check
          type="checkbox"
          label="Incluir números"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
        <Form.Check
          type="checkbox"
          label="Incluir símbolos"
          checked={includeSymbols}
          onChange={() => setIncludeSymbols(!includeSymbols)}
        />

        <div className="d-flex gap-2 mt-3">
          <Button className="flex-grow-1" variant="primary" onClick={generatePassword}>
            Generar Contraseña
          </Button>

          <Button variant="outline-secondary" onClick={() => { setPassword(''); if (!remember) localStorage.removeItem(STORAGE_KEY) }}>
            Limpiar
          </Button>
        </div>

        <Form.Check
          className="mt-3"
          type="switch"
          id="remember-switch"
          label="Recordar contraseña en este equipo"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />

        {remember && (
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <small className="text-muted">La contraseña se guardará localmente en este navegador.</small>
            <Button variant="link" size="sm" onClick={forgetSaved}>Olvidar</Button>
          </div>
        )}

        <PasswordDisplay password={password} />
      </Form>
    </div>
  )
}

export default PasswordGenerator
