import Header from './Header';

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      <div className="container mt-4">
        <h1 className="text-center" style={{ color: '#13d854' }}>Kallama Dashboard</h1>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card" style={{ borderColor: '#13d854' }}>
              <div className="card-body text-center">
                <h5 className="card-title">Active Projects</h5>
                <p className="card-text">Manage and track ongoing projects.</p>
                <a href="/projects" className="btn text-white" style={{ backgroundColor: '#13d854' }}>View Projects</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ borderColor: '#13d854' }}>
              <div className="card-body text-center">
                <h5 className="card-title">Teams</h5>
                <p className="card-text">Oversee your teams and roles.</p>
                <a href="/teams" className="btn text-white" style={{ backgroundColor: '#13d854' }}>Manage Teams</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ borderColor: '#13d854' }}>
              <div className="card-body text-center">
                <h5 className="card-title">Funding</h5>
                <p className="card-text">View and allocate project funding.</p>
                <a href="/funding" className="btn text-white" style={{ backgroundColor: '#13d854' }}>View Funding</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card" style={{ borderColor: '#13d854' }}>
              <div className="card-body">
                <h5 className="card-title">Milestone Tracking</h5>
                <p className="card-text">Stay updated on project milestones and deadlines.</p>
                <a href="/milestones" className="btn text-white" style={{ backgroundColor: '#13d854' }}>Track Milestones</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ borderColor: '#13d854' }}>
              <div className="card-body">
                <h5 className="card-title">Reports</h5>
                <p className="card-text">Generate and view detailed project reports.</p>
                <a href="/reports" className="btn text-white" style={{ backgroundColor: '#13d854' }}>View Reports</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;