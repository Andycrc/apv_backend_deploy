import express from 'express'
import { perfil, registrar, confirmar, autenticar, resetPassword, actualizarPassword, comprobarToken,actualizarPerfil, newPassword } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleWare.js';

const router = express.Router();

//Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/reset-password', resetPassword);    //validar el email
router.route('/reset-password/:token').get(comprobarToken).post(newPassword)


// Area privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);


export default router;