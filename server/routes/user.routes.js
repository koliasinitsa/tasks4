const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller')

router.get('/users', userController.getAllUsers.bind(userController));
router.post('/register', userController.registerUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController));
router.put('/block/:id', userController.blockUser.bind(userController));
router.put('/unblock/:id', userController.UnblockUser.bind(userController));
router.delete('/delete/:id', userController.deleteUser.bind(userController));

module.exports = router;