import React from 'react'
import styles from './Input.module.scss'

type Props = {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ label, onChange, ...rest }: Props) => (
  <div className={styles.inputWrapper}>
    <label>{label}</label>
    <input className={styles.input} onChange={onChange} {...rest} />
  </div>
)
