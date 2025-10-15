const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (pool) => {
  router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "Email inválido" });
      }

      const user = result.rows[0];

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Senha inválida" });
      }

      return res.json({
        success: true,
        user: { id: user.id_user, email: user.email, username: user.username },
      });
    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
};
