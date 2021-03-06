import React, { useEffect, useState, useRef } from 'react';
import { useForm } from './useForm';
import { Hello } from './Hello';
import { useFetch } from './useFetch';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '', firstName: '' });
  const [showHello, setShowHello] = useState(true);

  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')));
  const { data, loading } = useFetch(`http://numbersapi.com/${count}/trivia`);
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  return (
    <div>
      <div>{!data ? 'loading...' : data}</div>
      <div>count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>increment</button>
      <>
        <button onClick={() => setShowHello(!showHello)}>toggle</button>
        {showHello && <Hello />}
        <input ref={inputRef} name="email" value={values.email} onChange={handleChange} placeholder="email" />
        <input name="firstName" value={values.firstname} onChange={handleChange} placeholder="firstName" />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          focus
        </button>
      </>
    </div>
  );
};

export default App;
