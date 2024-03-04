const express = require('express');
const { register } = require('../controllers/userAuthContollers/register');
const { login } = require('../controllers/userAuthContollers/login');
const { logout } = require('../controllers/userAuthContollers/logout');
const { refresh } = require('../controllers/userAuthContollers/refresh');
const createSellController = require('../controllers/userSellControllers/createSell');
const authMiddleware = require('../middlewares/authMiddleware');
const singleUpload = require('../middlewares/multerMiddleware');
const { updateBookStatus } = require('../controllers/userSellControllers/updateSell');
const userProfileController = require('../controllers/userProfileController/userProfileController');
const router = express.Router();

// [+] Auth routes
router.post("/signup", register);
router.post("/signin", login);
router.post("/signout", logout);
router.post("/refresh", refresh);

// [+] sell routes
router.post("/create-sell", authMiddleware , singleUpload, createSellController.create);
router.post("/updata-status/:bookId", authMiddleware, updateBookStatus);

// [+] profile
router.get("/get-listed", authMiddleware , userProfileController.listMySells);
router.get("/get-sold", authMiddleware , userProfileController.listSoldBooks);
router.get("/get-unsold", authMiddleware , userProfileController.listUnSoldBooks);


module.exports = router;