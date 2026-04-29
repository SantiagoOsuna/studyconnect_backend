import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import subjectRoutes from './routes/subject.routes.js';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';
import eventRoutes from './routes/event.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/events', eventRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});