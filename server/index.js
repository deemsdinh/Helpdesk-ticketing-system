const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

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

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'HelpDesk API is running',
    })
})

app.get('/api/tickets', (req, res) => {
    res.json(tickets)
})

app.listen(PORT, () => {
    console.log(`HelpDesk API running on http://localhost:${PORT}`)

})