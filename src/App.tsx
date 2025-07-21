import { useState, useEffect } from 'react';
import './styles/App.css';
import AppRouter from './router/router';
import Navbar from './components/navbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <>
      <Navbar mode={darkMode} toggleMode={() => setDarkMode(!darkMode)} />
      <AppRouter mode={darkMode}/>
    </>
  );
}

export default App;
