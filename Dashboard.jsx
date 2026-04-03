function Dashboard() {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Traffic Violation Detection System</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Videos</h3>
          <span>12</span>
        </div>

        <div className="stat-card">
          <h3>Violations Detected</h3>
          <span>5</span>
        </div>

        <div className="stat-card">
          <h3>SMS Alerts Sent</h3>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;