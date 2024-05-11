import React, { FC } from 'react';
import cn from 'clsx';
import './button.css';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string | null;
  size?: string;
  label: string;
}

export const Button: FC<ButtonProps> = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'button--primary' : 'button--secondary';

  const onClick = () => { };

  return (
    <button
      type="button"
      className={cn('button', `button--${size}`, mode)}
      style={{ backgroundColor: backgroundColor || 'green' }}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
