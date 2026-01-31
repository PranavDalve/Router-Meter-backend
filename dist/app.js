import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import routerEventRoutes from "./routes/routerEvents.routes.js";
import 'reflect-metadata';
const app = express();
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://rm-router-meter.vercel.app/' // development frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // important if you use cookies later
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api", routerEventRoutes);
// Example protected route
app.get('/api/protected', (req, res) => {
    res.json({ message: 'Protected content' });
});
// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
export default app;
