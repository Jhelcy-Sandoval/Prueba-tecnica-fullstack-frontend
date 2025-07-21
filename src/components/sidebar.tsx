import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import useUserData from "../hooks/userHooks";

interface SidebarProps {
  mode: boolean;  
}

export default function Sidebar({ mode }: SidebarProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/home') setActiveButton('home');
    else if (path === '/dashboard') setActiveButton('dashboard');
    else if (path === '/projects') setActiveButton('projects');
    else if (path === '/files') setActiveButton('files');
    else if (path === '/user') setActiveButton('user');
  }, [location.pathname]);

  const handleButtonClick = (page: string, buttonName: string): void => {
    setActiveButton(buttonName);
    navigate(page);
  };

  const handleExit = () => {
    window.location.reload();
  };

  return (
    <div
      className={`d-flex flex-column p-3 h-100 border-end ${mode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      style={{ width: '250px' }}
    >
      <section className="border-bottom mb-3 pb-2">
        <nav className="d-flex flex-column">
           <button
            className={`btn text-start mb-2 ${activeButton === 'projects' ? 'btn-outline-primary' : mode ? 'btn-dark' : 'btn-light'}`}
            onClick={() => handleButtonClick('/projects', 'projects')}
          >
            Projects
          </button>
          <button
            className={`btn text-start mb-2 ${activeButton === 'dashboard' ? 'btn-outline-primary' : mode ? 'btn-dark' : 'btn-light'}`}
            onClick={() => handleButtonClick('/dashboard', 'dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </section>

      <section className="mb-3">
        <nav className="d-flex flex-column">
         <button
            className={`btn text-start mb-2 ${activeButton === 'home' ? 'btn-outline-primary' : mode ? 'btn-dark' : 'btn-light'}`}
            onClick={() => handleButtonClick('/home', 'home')}
          >
            Home
          </button>
        </nav>
      </section>
    </div>
  );
}
