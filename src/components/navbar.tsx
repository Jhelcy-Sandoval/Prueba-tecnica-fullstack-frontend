import "../styles/App.css";

interface NavBarProps {
  mode: boolean;
  toggleMode: () => void;
}

export default function NavBar({ mode, toggleMode }: NavBarProps) {
  return (
    <>
      <div>    
        <nav className={`navbar navbar-expand-lg ${mode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} border-bottom shadow-sm`}>
          <div className="container-fluid">
            <div className="w-100">
              <a className="navbar-brand " href="/">
                <img src={
                  mode ? "/logo-dark.jpg" : "/logo-light.webp"
                } className="img" alt="logo"/>
              </a>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="flex-shrink-1" role="search">
                <button className="btn btn-sm btn-outline-secondary" onClick={toggleMode}>
                  {mode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
