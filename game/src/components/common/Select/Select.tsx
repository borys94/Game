import React from 'react'
import styles from './Select.module.scss'

type Props = {
  children: React.ReactNode
} & React.InputHTMLAttributes<HTMLSelectElement>

export const Select = ({ children, ...rest }: Props) => (
  <select className={styles.select} {...rest}>
    {children}
  </select>
)
