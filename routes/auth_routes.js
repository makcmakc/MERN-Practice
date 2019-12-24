const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// /api/auth/register
router.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body
		const candidate = await User.findOne({ email })


		if (candidate) {
			return res.satus(400).json({ message: 'Такой пользователь уже существует' })
		}
	} catch (e) {
		res.status(500).json({message: "Что то пошло не такб попробуйте снова"})
	}
})

// /api/auth/login
router.post('/login', async (req, res) => {
	try {

	} catch (e) {
		
	}	
})



module.exports = router