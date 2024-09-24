import { authentication } from "../tools/hash.mjs";
import { generateToken } from "../tools/createToken.mjs";
import { formatDateToSQL } from "../tools/dateFormater.mjs";

// Endpoint for handling user login
export const postLogin = async(req, res) => {
  const { username, password } = req.body;
  const findUserQueryString = `SELECT * FROM t_users WHERE username = ?`;

     if (!username) {
        return res.status(401).json({ message: "You did not provide a username." });
    }
    if (!password) {
        return res.status(401).json({ message: "You did not provide a password." });
    }

  try {
      const [result] = await req.dbConnection.execute(findUserQueryString, [username]);
      const user = result[0];

      if (!user) {
          return res.status(401).json({ message: "Invalid username or password." });
      }

      const salt = user.useSalt;
      const expectedHash = authentication(password, salt)

      if (user.usePassword != expectedHash) {
          return res.status(401).json({ message: "Invalid username or password." });
      }

      const message = `User has successfully logged in.`;
      
      const token = generateToken(user);

      res.cookie('authToken', token, {
          httpOnly: true, // Accessible only by web server
          secure: true, // Ensures the cookie is only sent over HTTPS
          sameSite: 'strict', // Ensures the cookie is sent only to the same site
          maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
          path: '/'
      });
      console.log(`${username} signed into their account at ${formatDateToSQL(new Date())}`)
      return res.status(200).json({ message, token});
  } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};