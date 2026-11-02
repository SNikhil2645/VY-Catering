import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { CLIENT_ORIGIN } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error-handler';

import authRoutes from './routes/auth';
import enquiryRoutes from './routes/enquiries';
import galleryRoutes from './routes/gallery';
import menuRoutes from './routes/menu';
import contentRoutes from './routes/content';
import adminGalleryRoutes from './routes/admin/gallery';
import adminMenuRoutes from './routes/admin/menu';
import adminSettingsRoutes from './routes/admin/settings';
import adminStatsRoutes from './routes/admin/stats';
import adminUploadRoutes from './routes/admin/upload';

const app = express();

app.use(
  cors({
    origin: [CLIENT_ORIGIN],
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve admin-uploaded media through the API origin. The Next.js client
// proxies /uploads/* here so relative image URLs keep working.
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'venky-yadav-caterings-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/content', contentRoutes);

app.use('/api/admin/gallery', adminGalleryRoutes);
app.use('/api/admin/menu', adminMenuRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/admin/stats', adminStatsRoutes);
app.use('/api/admin/upload', adminUploadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
