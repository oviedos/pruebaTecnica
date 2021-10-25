const {Router} = require('express');

const {
  getUsers,
  addUser,
  delUserById,
  updateUserById,
} = require("../controller/user.controller");

const router = Router();

router.get("/users", getUsers);

router.post("/users", addUser);

router.delete("/users/:id", delUserById);

router.put("/users/:id", updateUserById);

module.exports = router;
