const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const PORT = config.get('port') || 5000

const app = express()
app.use(express.json({ extended: true }))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))


app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
	} catch (e) {
		console.log('Serevr Error', e.message)
		process.exit()
	}
}

app.listen(PORT, () => {
	console.log(`App has been started on port ${PORT}... `)
})