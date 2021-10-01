import React from 'react';
import { useNavigate } from 'src/@core/hooks/use-navigate';

interface LinkProps {
  to: string;
  children: React.ReactChild;
  className?: string;
  title?: string;
}

export const Link = (props: LinkProps) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (props.to.includes('http')) {
      window.open(props.to);
      return;
    }
    navigate(props.to);
  };
  return (
    <a title={props.title} className={props.className} href={props.to} onClick={handleClick}>
      {props.children}
    </a>
  );
};
