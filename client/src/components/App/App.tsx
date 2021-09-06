import React, { useEffect, useState } from 'react'

export const App = (props: any) => {
  const [content, setContent] = useState('Hello from React')
  useEffect(() => {
    setTimeout(() => {
      setContent('CLIENT CODE WORKS!!!!')
    }, 3000);
  }, []);

  return (
    <div>{content}</div>
  )
}
