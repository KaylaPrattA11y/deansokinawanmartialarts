import express from 'express';
import cookieParser from 'cookie-parser';
import ServerlessHttp from 'serverless-http';
import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from 'tinacms-authjs';
import cors from 'cors';
import dotenv from 'dotenv';

import { databaseClient } from '../../tina/__generated__/databaseClient';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Log env var presence (not values) for debugging
console.log('[tina] Env check:', {
  NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  MONGODB_URI: !!process.env.MONGODB_URI,
  GITHUB_OWNER: !!process.env.GITHUB_OWNER,
  GITHUB_REPO: !!process.env.GITHUB_REPO,
  GITHUB_PERSONAL_ACCESS_TOKEN: !!process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  TINA_PUBLIC_IS_LOCAL: process.env.TINA_PUBLIC_IS_LOCAL,
});

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const tinaBackend = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
          debug: true,
        }),
      }),
  databaseClient,
})

app.post('/api/tina/{*splat}', async (req, res, next) => {
  try {
    await tinaBackend(req, res)
  } catch (e) {
    console.error('[tina] POST error:', e)
    next(e)
  }
})

app.get('/api/tina/{*splat}', async (req, res, next) => {
  try {
    await tinaBackend(req, res)
  } catch (e) {
    console.error('[tina] GET error:', e)
    next(e)
  }
})

// Global error handler to log unhandled errors
app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error('[tina] Unhandled error:', err)
  if (!res.headersSent) {
    res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
})

export const handler = ServerlessHttp(app)