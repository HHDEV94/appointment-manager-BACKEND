import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import idGenerator from '../helpers/idGenerator.js'

const veterianarioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  telephone: {
    type: String,
    default: null,
    trim: true
  },
  web: {
    type: String,
    default: null
  },
  token: {
    type: String,
    default: idGenerator()
  },
  confirmed: {
    type: Boolean,
    default: false
  }
})

veterianarioSchema.pre('save', async function (next) {
  //Si el passwor ya esta hasheado no lo volverá a hashear
  if (!this.isModified('password')) {
    next()
  }

  //Hashear Password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//Compares whether the encrypted password is the same as the password typed by the user
//.compare() returns a boolean
veterianarioSchema.methods.verifyPassword = async function (passForm) {
  return await bcrypt.compare(passForm, this.password)
}

const Veterinario = mongoose.model('Veterinario', veterianarioSchema)

export default Veterinario
