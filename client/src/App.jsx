import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [tickets, setTickets] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/tickets')
			.then((response) => response.json())
			.then((data) => {
				setTickets(data)
			})
			.catch((error) => {
				console.error('Error fetching tickets:', error)
			})
	}, [])

	const openTickets = tickets.filter(
		(ticket) => ticket.status === 'Open'
	).length

	const inProgressTickets = tickets.filter(
		(ticket) => ticket.status === 'In Progress'
	).length

	const resolvedTickets = tickets.filter(
		(ticket) => ticket.status === 'Resolved'
	).length

	return (
		<div className="dashboard">
			<h1>HelpDesk</h1>
			<p className="subtitle">IT Support Dashboard</p>

			<div className="stats">
				<div className="card">
					<h3>Open Tickets</h3>
					<p>{openTickets}</p>
				</div>

				<div className="card">
					<h3>In Progress</h3>
					<p>{inProgressTickets}</p>
				</div>

				<div className="card">
					<h3>Resolved</h3>
					<p>{resolvedTickets}</p>
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
