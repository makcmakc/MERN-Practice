// General Variables
const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post(
	'/register', 
	[
		check('email', 'Некорректный E-mail').isEmail(),   // Incorrect E-mail
		check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }) // Minimal Length of Password is 6 symbols
	], 
	async (req, res) => {

	try {
		const errors = validationResult(req)

		if (errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный данные при регистрации' // Incorrect Registration Data
			})
		}
		const { email, password } = req.body
		const candidate = await User.findOne({ email })

		if (candidate) {
			return res.satus(400).json({ message: 'Такой пользователь уже существует' }) // User
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ email, password: hashedPassword })
		await user.save()

		res.satus(201).json({ message: 'Ползователь создан' }) // User have been created

	} catch (e) {
		res.status(500).json({message: "Что то пошло не так, попробуйте снова"}) // Something went wrong, try again
	}
})

// /api/auth/login
router.post(
	'/login', 
	[
		check('email', "Введите корректный E-mail").normalizeEmail().isEmail(), // Enter a correct E-mail
		check('password', 'Введите пароль').exist() // Enter a Password
	],
	async (req, res) => {

	try {
		const errors = validationResult(req)

		if (errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный данные при регистрации' // Incorrect Registration Data
			})
		}

		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(400).json({ message: "Пользователь не найден" }) // User is Not Found
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.satus(400).json({ message: "Неверный пароль, попробуйте снова" }) // Incorrect Password, try again
		}

		const token = jwt.sign(
			{ userId: user.id },
			config.get('jwtSecret'),
			{ expiresId: '1h' }
		)

		res.json({ token, userId: user.id })

	} catch (e) {
		res.status(500).json({message: "Что-то пошло не так, попробуйте снова"}) // Something went wrong, try again
	}
})



module.exports = router