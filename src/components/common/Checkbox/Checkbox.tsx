import React from 'react'
import styles from './Checkbox.module.scss'
import classNames from 'classnames'
import { Variant } from '../types'

type Props = {
  label: string
  variant?: Variant
} & React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = ({ label, variant = 'primary', onChange, ...rest }: Props) => (
  <div className={styles.inputWrapper}>
    <label className={classNames(styles.inputContol, styles.variant)}>
      <input className={styles.input} onChange={onChange} type="checkbox" {...rest} />
      {label}
    </label>
  </div>
)
