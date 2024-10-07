import express from 'express';
import * as Path from 'node:path';
import usersRoutes from './routes/routerUsers';
import tasksRoutes from './routes/routerTask';
import timeSlotsRoutes from './routes/routerTimeSlot';
import assignmentsRoutes from './routes/routerAssignment';

const server = express();

server.use(express.json());

// Set up routes
server.use('/api/v1/users', usersRoutes);
server.use('/api/v1/tasks', tasksRoutes);
server.use('/api/v1/timeslots', timeSlotsRoutes);
server.use('/api/v1/assignments', assignmentsRoutes);

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')));
  server.use('/assets', express.static(Path.resolve('./dist/assets')));
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'));
  });
}

export default server;
