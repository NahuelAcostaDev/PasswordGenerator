import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

type Props = {
  password: string
}

const PasswordDisplay: React.FC<Props> = ({ password }) => {
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch (err) {
      const textarea = document.createElement('textarea')
      textarea.value = password
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      } catch {
        alert('No se pudo copiar la contraseña automáticamente. Selecciónala y cópiala manualmente.')
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <div className="password-display mt-3 d-flex flex-column align-items-stretch">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="pw-box p-2 flex-grow-1 me-2" aria-live="polite">
          {password ? <strong className="text-break">{password}</strong> : <span className="text-muted">Aquí aparecerá la contraseña</span>}
        </div>

        <Button
          variant="primary"
          onClick={copyToClipboard}
          disabled={!password}
          aria-label={password ? 'Copiar contraseña' : 'Sin contraseña para copiar'}
          className="d-flex align-items-center"
        >
          {copied ? '✔ Copiado!' : 'Copiar'}
        </Button>
      </div>

      <small className="text-muted">
        {password ? 'Contraseña lista. Manténla segura.' : 'Generá una contraseña primero.'}
      </small>
    </div>
  )
}

export default PasswordDisplay
