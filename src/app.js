import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import subjectRoutes from './routes/subject.routes.js';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';
import eventRoutes from './routes/event.routes.js';
import logger from './config/logger.js';

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/events', eventRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  logger.error('Error no manejado:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT}`);
});