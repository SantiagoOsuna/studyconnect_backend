import userService from '../services/user.service.js';
import logger from '../config/logger.js';

export const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    logger.error('Error en registro:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.loginUser(email, password);

    res.json({
      token: result.token,
      user: { id: result.user.id, name: result.user.name, email: result.user.email }
    });

  } catch (error) {
    logger.error('Error en login:', error);
    res.status(401).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    logger.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    logger.error('Error al obtener usuario:', error);
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUserService(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    logger.error('Error al actualizar usuario:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUserService(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    logger.error('Error al eliminar usuario:', error);
    const status = error.message.includes('no encontrado') ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};