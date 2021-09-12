import React, { useEffect, useState } from 'react'

export const App = (props: any) => {
  const [content, setContent] = useState('Hello from React')
  useEffect(() => {
    setTimeout(() => {
      setContent('CLIENT CODE WORKS!!!!')
    }, 3000);
    fetch('/api')
      .then((response) => response.json())
      .then((data) => console.log('Response from API!!!!',  data))
      .catch((err) => {
        console.log('FAIL GET DATA FROM API', err);
      })
  }, []);

  return (
    <div>{content}</div>
  )
}
