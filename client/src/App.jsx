import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [tickets, setTickets] = useState([])
	const [title, setTitle] = useState('')
	const [priority, setPriority] = useState('Medium')
	const [submitError, setSubmitError] = useState('')
	const [submitting, setSubmitting] = useState(false)

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

	async function handleSubmit(event) {
		event.preventDefault()

		setSubmitting(true)
		setSubmitError('')

		try {
			const response = await fetch(
				'http://localhost:3000/api/tickets',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title: title,
						priority: priority,
					}),
				}
			)

			const newTicket = await response.json()

			if (!response.ok) {
				throw new Error(
					newTicket.error || 'Failed to create ticket'
				)
			}

			setTickets((currentTickets) => [
				...currentTickets,
				newTicket,
			])

			setTitle('')
			setPriority('Medium')

		} catch (error) {
			setSubmitError(error.message)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="dashboard">
			<h1>HelpDesk</h1>
			<p className="subtitle">
				IT Support Dashboard
			</p>

			<form className="ticket-form" onSubmit={handleSubmit}>
				<h2>Create Support Ticket</h2>

				<div className="form-group">
					<label htmlFor="ticket-title">
						Issue Title
					</label>

					<input
						id="ticket-title"
						type="text"
						placeholder="Describe your IT issue"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="ticket-priority">
						Priority
					</label>

					<select
						id="ticket-priority"
						value={priority}
						onChange={(event) => setPriority(event.target.value)}
					>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>

				{submitError && (
					<p role="alert" className="form-error">
						{submitError}
					</p>
				)}

				<button type="submit" disabled={submitting}>
					{submitting ? 'Submitting...' : 'Submit Ticket'}
				</button>
			</form>

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
