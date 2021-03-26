const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { username, password, profile_pic } = req.body

    try {
      const [ existingUser ] = await db.find_user_by_username(username)

      if (existingUser) {
        return res.status(409).send('User already exists')
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const [ newUser ] = await db.create_user(username, hash, profile_pic)

      req.session.user = newUser

      res.status(200).send(newUser)

    } catch(err) {
      console.log(err)
      return res.sendStatus(500)
    }
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body

    try {
      const [ existingUser ] = await db.find_user_by_username(username)

      if (!existingUser) {
        return res.status(403).send('Incorrect username and/or password')
      }

      const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

      if (!isAuthenticated) {
        return res.status(403).send('Incorrect username and/or password')
      }

      delete existingUser.hash
      req.session.user = existingUser
      res.status(200).send(req.session.user)
    } catch(err) {
      console.log(err)
      return res.sendStatus(500)
    }
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}