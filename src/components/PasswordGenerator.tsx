import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PasswordDisplay from './PasswordDisplay'
import '../styles/PG.css'

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12)
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

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

        <Button className="mt-3 w-100" variant="primary" onClick={generatePassword}>
          Generar Contraseña
        </Button>

        {/* Aquí usamos el componente que tiene la lógica de copiar */}
        <PasswordDisplay password={password} />
      </Form>
    </div>
  )
}

export default PasswordGenerator
