import userRepo from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

class UserService {

  async registerUser(data) {
    try {
      const { name, email, password } = data;

      if (!name || !email || !password) {
        throw new Error('Nombre, email y contraseña son requeridos');
      }

      const existingUser = await userRepo.findByEmail(email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userRepo.create(name, email, hashedPassword);
      logger.info('Usuario registrado exitosamente', { userId: user.id, email });
      return user;
    } catch (error) {
      logger.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }

      const user = await userRepo.findByEmail(email);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Contraseña incorrecta');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      logger.info('Usuario logueado exitosamente', { userId: user.id, email });
      return { user, token };
    } catch (error) {
      logger.error('Error al loguear usuario:', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      if (!id) {
        throw new Error('ID de usuario requerido');
      }

      const user = await userRepo.findUserById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      logger.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await userRepo.getAllUsers();
      return users;
    } catch (error) {
      logger.error('Error al obtener todos los usuarios:', error);
      throw error;
    }
  }

  async updateUserService(id, data) {
    try {
      const { name, email } = data;
      if (!id || (!name && !email)) {
        throw new Error('ID y al menos un campo para actualizar son requeridos');
      }

      const user = await userRepo.updateUser(id, name, email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      logger.info('Usuario actualizado exitosamente', { userId: id });
      return user;
    } catch (error) {
      logger.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async deleteUserService(id) {
    try {
      if (!id) {
        throw new Error('ID de usuario requerido');
      }

      const result = await userRepo.deleteUser(id);
      if (!result) {
        throw new Error('Usuario no encontrado');
      }

      logger.info('Usuario eliminado exitosamente', { userId: id });
      return result;
    } catch (error) {
      logger.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
}

export default new UserService();