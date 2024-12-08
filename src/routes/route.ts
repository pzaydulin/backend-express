import express from 'express';
import AuthController from '../controllers/AuthController';
import { validateUser } from '../middleware/authenticate';
import MessageController from '../controllers/MessageController';
import UserControllers from '../controllers/UserControllers';

const router = express.Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get("/auth/logout", validateUser, AuthController.logout);
router.get('/auth/me', validateUser, AuthController.me);

router.get('/users', validateUser, UserControllers.getAllUsers);

router.get('/message', validateUser, MessageController.getAllMessages);
router.get('/message/:id', validateUser, MessageController.getMessage);
router.get('/message/:id/read', validateUser, MessageController.readMessage);
router.get('/message/:id/delete', validateUser, MessageController.deleteMessage);
router.post('/message', validateUser, MessageController.createMessage);

export default router;