const {Router} = required('express')
const Link = required('../models/Link')


router.push('/generate', async (req, res) => {
	try {
		
	} catch (e) {
		res.status(500).json({message: "Что то пошло не так, попробуйте снова"}) // Something went wrong, try again
	}
})

router.get('/', async (req, res) => {
	try {
		
	} catch (e) {
		res.status(500).json({message: "Что то пошло не так, попробуйте снова"}) // Something went wrong, try again
	}
})


router.get('/:id', async (req, res) => {
	try {
		
	} catch (e) {
		res.status(500).json({message: "Что то пошло не так, попробуйте снова"}) // Something went wrong, try again
	}
})

module.exports = router