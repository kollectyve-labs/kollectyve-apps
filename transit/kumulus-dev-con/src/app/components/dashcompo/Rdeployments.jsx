function Deployments() {
  return(
<div className="bg-white p-6 rounded-lg">
  <h2 className="text-[1.5em] text-black font-bold"> Recent Deployments</h2>
  <table className="w-[100%] border-collapse">
  <thead>
          <tr>
            <th>Application</th>
            <th>Customer</th>
            <th>Resources</th>
            <th>Status</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Web Server Cluster</td>
            <td>TechCorp Inc</td>
            <td>8 CPU, 16GB RAM</td>
            <td><span className="status-badge status-active">Active</span></td>
            <td>$450/mo</td>
          </tr>
          <tr>
            <td>Database Cluster</td>
            <td>DataFlow Ltd</td>
            <td>16 CPU, 64GB RAM</td>
            <td><span className="status-badge status-active">Active</span></td>
            <td>$1,200/mo</td>
          </tr>
          <tr>
            <td>ML Training Instance</td>
            <td>AI Solutions</td>
            <td>32 CPU, 128GB RAM</td>
            <td><span className="status-badge status-pending">Pending</span></td>
            <td>$2,800/mo</td>
          </tr>
        </tbody>
  </table>
</div>
  );
}

export default Deployments;