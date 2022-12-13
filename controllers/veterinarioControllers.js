import Veterinario from '../models/Veterinario.js'
import jwtGenerator from '../helpers/jwtGenerator.js'
import idGenerator from '../helpers/idGenerator.js'

const signUp = async (req, res) => {
  const { email } = req.body

  //check registered users
  const existUser = await Veterinario.findOne({ email })

  if (existUser) {
    const error = new Error('This user already exists!')
    return res.status(400).json({ msg: error.message })
  }

  try {
    //Save New Veterinario
    const vetenerinario = new Veterinario(req.body)
    const veterinarioGuardado = await vetenerinario.save()

    res.json(veterinarioGuardado)
  } catch (error) {
    console.log(error)
  }
}

const profile = (req, res) => {
  const { veterinario } = req

  res.json({ profile: veterinario })
}

const confirmAccount = async (req, res) => {
  const { token } = req.params

  const confirmUser = await Veterinario.findOne({ token })

  if (!confirmUser) {
    const error = new Error('Invalid Token!')
    return res.status(404).json({ msg: error.message })
  }

  try {
    confirmUser.token = null
    confirmUser.confirmed = true
    await confirmUser.save()

    res.json({ msg: 'User Confirmed Successfull!' })
  } catch (error) {
    console.log(error)
  }
}

const authenticateUser = async (req, res) => {
  const { email, password } = req.body

  //Comprobar si un usuario existe
  const existUser = await Veterinario.findOne({ email })
  if (!existUser) {
    const error = new Error('User does not exists!')
    return res.status(403).json({ msg: error.message })
  }

  if (!existUser.confirmed) {
    const error = new Error("The user hasn't yet been confirmed!")
    return res.status(403).json({ msg: error.message })
  }

  //Verify passwords
  if (await existUser.verifyPassword(password)) {
    res.json({ token: jwtGenerator(existUser.id) })
  } else {
    const error = new Error('Incorrect Password!')
    return res.status(403).json({ msg: error.message })
  }
}

const recoveryPassword = async (req, res) => {
  const { email } = req.body

  const existUser = await Veterinario.findOne({ email })
  if (!existUser) {
    const error = new Error('User not exists')
    return res.status(400).json({ msg: error.message })
  }

  try {
    existUser.token = idGenerator()
    await existUser.save()

    res.json({ msg: 'We have sent an email with instructions! ' })
  } catch (error) {}
}

const verifyToken = async (req, res) => {
  const { token } = req.params

  const validToken = await Veterinario.findOne({ token })
  if (validToken) {
    res.json({ msg: 'Valid token, the user exists' })
  } else {
    const error = new Error('Invalid Token!')
    res.status(400).json({ msg: error.message })
  }
}

const newPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const veterinario = await Veterinario.findOne({ token })
  if (!veterinario) {
    const error = new Error('There was an error!')
    res.status(400).json({ msg: error.message })
  }

  try {
    veterinario.token = null

    veterinario.password = password
    await veterinario.save()

    res.json({ msg: 'Password Successfully Changed!' })
  } catch (error) {
    console.log(error)
  }
}

export {
  signUp,
  profile,
  confirmAccount,
  authenticateUser,
  recoveryPassword,
  verifyToken,
  newPassword
}
