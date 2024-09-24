import { random, authentication } from "../tools/hash.mjs";

const [minPasswordLength, maxPasswordLength] = [8,100]

export const postRegister = async(req, res) => {
    const { username, password} = req.body;
  
    if (password.length < minPasswordLength || password.length > maxPasswordLength) {
        return res.status(400).json({ error: "Invalid password length" });
      }
    
  
    const existingUserQuery = `SELECT * FROM t_users WHERE username = ?;`;
    try {
      const [existingUser] = await req.dbConnection.execute(existingUserQuery,[username]);
      
      if (existingUser.length >= 1) {
        return res.status(200).json({ error: 'A user with the provided username already exists. Please choose a different username.' });
      }
      
      const registerUserQuery = `INSERT INTO t_users (username, password, salt) VALUES (?, ?, ?)`;
  
      const salt = random();
      const hashedPassword = authentication(password, salt)

      const [registerUser] = await req.dbConnection.execute(registerUserQuery, [username, hashedPassword, salt]);
  
      if (registerUser.affectedRows === 1) {
        const message = `User has successfully registered.`;
        return res.status(200).json({ message });
      } else {
        res.status(401).json({ error: "Failed to register user." });
      }
      console.log(`${username} created an account`)
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};
