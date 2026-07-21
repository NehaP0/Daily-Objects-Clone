
const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
   const token = req.headers.authorization
   if (token) {
      try {
         let decoded;
         try {
            decoded = jwt.verify(token, "tough-request");
         } catch {
            decoded = jwt.verify(token, "tough-requestUYJHMN¥");
         }
         if (decoded && decoded.userId) {
            console.log("decoded", decoded)
            console.log("userid", decoded.userId)
            req.body.userId = decoded.userId
            next()
         } else {
            res.status(401).send({ msg: "Login First" })
         }
      } catch (err) {
         res.status(401).send({ msg: "Invalid or expired token, please login again" })
      }
   }
   else {
      res.status(401).send({ msg: "Login First" })
   }
}

module.exports = { auth }