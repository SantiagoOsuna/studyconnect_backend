import * as userRepo from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const registerUser = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  const existingUser = await userRepo.findUserByEmail(email);

  if (existingUser.rows.length > 0) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userRepo.createUser(name, email, hashedPassword);
  return result.rows[0];
};

export const getUserById = async (id) => {
  const result = await userRepo.findUserById(id);

  if (result.rows.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  return result.rows[0];
};

export const getUsers = async () => {
  const result = await userRepo.getAllUsers();
  return result.rows;
};

export const updateUserService = async (id, data) => {
  const { name, email } = data;

  const result = await userRepo.updateUser(id, name, email);

  if (result.rows.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  return result.rows[0];
};

export const deleteUserService = async (id) => {
  await userRepo.deleteUser(id);
};