const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (pool) => {
  router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Register attempt:", email);

    try {
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res
          .status(409)
          .json({ success: false, message: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id_user, username, email",
        [username, email, hashedPassword]
      );

      const newUser = result.rows[0];

      return res.status(201).json({
        success: true,
        user: {
          id: newUser.id_user,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
};
