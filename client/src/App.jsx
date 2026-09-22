import './App.css'

const tickets = [
  {
    id: 1042,
    title: 'VPN not connecting',
    priority: 'High',
    status: 'Open',
  },
  {
    id: 1041,
    title: 'Password reset',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 1040,
    title: 'Monitor not detected',
    priority: 'Low',
    status: 'Resolved',
  },
  {
    id: 1039,
    title: 'Outlook not opening',
    priority: 'High',
    status: 'Open',
  },
]

function App() {
	return (
		<div className="dashboard"> 
			<h1>HelpDesk</h1>
			<p className="subtitle">IT Support Dashboard</p>
			
			<div className="stats">
				<div className="card">
					<h3>Open Tickets</h3>
					<p>12</p>
				 </div>

				<div className="card">
					<h3>In Progress</h3>
					<p>5</p>
				</div>

				<div className="card">
					<h3>Resolved</h3>
					<p>38</p>
				</div>
			 </div>

			<div className="tickets-section">
				<h2>Recent Tickets</h2>

				<table className="tickets-table">
					<thead>
						<tr>
							<th>Ticket</th>
							<th>Issue</th>
							<th>Priority</th>
							<th>Status</th>
						 </tr>
					</thead>

					<tbody>
						{tickets.map((ticket) => (
							<tr key={ticket.id}>
								<td>#{ticket.id}</td>
								<td>{ticket.title}</td>

								<td>
								  <span className={`badge ${ticket.priority.toLowerCase()}`}>
   									 {ticket.priority}
								  </span>
								</td>

								<td>
  								 <span
   									className={`badge status-${ticket.status
     									 .toLowerCase()
     									 .replace(' ', '-')}`}
  								>
   									{ticket.status}
  								 </span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default App
