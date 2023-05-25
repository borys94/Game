import React from 'react'
import styles from './Button.module.scss'
import classnames from 'classnames'
import sounds from '../../game/sounds'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant: 'primary' | 'secondary'
}

export const Button = ({ children, variant, onClick }: Props) => (
  <div className={classnames(styles.buttonWrapper)} onMouseEnter={() => sounds.menuSound()}>
    <button className={classnames(styles.button, variant === 'secondary' && styles.secondaryButton)} onClick={onClick}>
      {children}
    </button>
  </div>
)

type IconButton = {
  children: React.ReactNode
  onClick?: () => void
}

export const IconButton = ({ children, onClick }: IconButton) => (
  // <div className={classnames(styles.buttonWrapper)} onMouseEnter={() => sounds.menuSound()}>
  <button className={classnames(styles.iconButton)} onClick={onClick} onMouseEnter={() => sounds.menuSound()}>
    {children}
  </button>
  // </div>
)
