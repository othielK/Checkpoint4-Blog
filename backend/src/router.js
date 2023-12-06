const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const auth = require("./middlewares/auth");
const postControllers = require("./controllers/postControllers");
const uploadMiddleware = require("./middlewares/upload");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.post("/user", auth.validateUser, auth.hashPassword, userControllers.add);
router.post("/login", auth.checkEmailIfExist, userControllers.verifyPassword);

router.get("/posts", postControllers.browse);
router.get("/posts/:id", postControllers.selectPost);
router.post("/post", uploadMiddleware.uploadFile, postControllers.add);
router.put("/post/:id", postControllers.edit);
router.delete("/posts/:userId/:postId", postControllers.delPost);

module.exports = router;
