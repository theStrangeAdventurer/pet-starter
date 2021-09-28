import React, { useEffect } from 'react'
import { useNavigate } from 'src/@core/hooks/use-navigate';
import styles from './App.module.css';

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/details/someDeailId')
    }, 5000);
  }, []);
  
  return (
    <div className={styles.app}>
      <h1>App component</h1>
    </div>
  )
}
