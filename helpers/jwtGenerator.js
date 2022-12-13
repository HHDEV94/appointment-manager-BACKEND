import jwt from 'jsonwebtoken'

const jwtGenerator = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default jwtGenerator

/**
 * 1. Generar una palabara secreta en el archivo .env.
 * 2. .sign() -> Genera un jwt,
 *  a) se pasa un objeto con la info que queremos agregar al token
 *  b) la palabra secreta
 *  c) un objeto con las opciones de configuracion.
 *
 * 3. .verify() -> toma diferentes parámetros para comprobar el token.
 *  a) token que se va a comprobar.
 *  b) palabra secreta que escribimos en el archivo .env
 *
 */
