import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    logger.warn('Intento de acceso sin token', { ip: req.ip, url: req.url });
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    logger.warn('Formato de token inválido', { ip: req.ip, url: req.url });
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info('Token verificado exitosamente', { userId: decoded.id, url: req.url });
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.warn('Token expirado', { ip: req.ip, url: req.url });
      return res.status(401).json({ message: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      logger.warn('Token inválido', { ip: req.ip, url: req.url });
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      logger.error('Error al verificar token:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};