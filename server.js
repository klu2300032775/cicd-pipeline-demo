import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Serve static files from dist
app.use(express.static(join(__dirname, 'dist')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'To-Do List App is running' })
})

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ To-Do List App running on http://localhost:${PORT}`)
})
