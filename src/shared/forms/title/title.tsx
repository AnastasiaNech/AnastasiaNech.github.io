import React, { FC } from 'react';
import cn from 'clsx';
import './title.css';

export type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
  classTitle?: string;
  children: React.ReactElement | React.ReactNode;
  required?: boolean;
};

export const Title: FC<TitleProps> = ({ classTitle, required, ...props }) => (
  <div {...props} className={cn('root', classTitle)} />
);
