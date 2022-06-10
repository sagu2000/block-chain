const { authenticateJWT } = require("../services/authentication/index.js");

router.get("/", authenticateJWT, (req, res) => {
  res.json(req.user);
});
