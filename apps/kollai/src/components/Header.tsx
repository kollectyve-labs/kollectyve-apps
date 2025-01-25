const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#13d854', color: '#fff' }}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">Relai</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/profile">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;