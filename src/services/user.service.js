import userRepo from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

class UserService {

  async registerUser(data) {
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepo.create(name, email, hashedPassword);
  }

  async loginUser(email, password) {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }

  getUserById(id) {
    return userRepo.findUserById(id);
  }

  getUsers() {
    return userRepo.getAllUsers();
  }

  updateUserService(id, data) {
    const { name, email } = data;
    return userRepo.updateUser(id, name, email);
  }

  deleteUserService(id) {
    return userRepo.deleteUser(id);
  }
}

export default new UserService();