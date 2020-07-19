import React from 'react'
import { Form } from 'react-bootstrap'

interface IText {
  module: string
  label: string
  error: string
}

interface ITextAreaProps {
  name: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: any) => void
  onBlur: (e: any) => void
  text: IText
}

const TextArea: React.FC<ITextAreaProps> = ({ name, placeholder, value, onChange, onBlur, text }) => {
  return (
    <Form.Group controlId={text.module + name}>
      <Form.Label>{text.label}</Form.Label>
      <Form.Control
        name={name}
        as="textarea"
        rows={25}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={text.error ? true : false}
      />
      <Form.Control.Feedback type="invalid">{text.error}</Form.Control.Feedback>
    </Form.Group>
  )
}
export default TextArea
