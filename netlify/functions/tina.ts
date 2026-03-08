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

app.post('/api/tina/*', async (req, res, next) => {
  try {
    await tinaBackend(req, res)
  } catch (e) {
    console.error('[tina] POST error:', e)
    next(e)
  }
})

app.get('/api/tina/*', async (req, res, next) => {
  try {
    await tinaBackend(req, res)
  } catch (e) {
    console.error('[tina] GET error:', e)
    next(e)
  }
})

app.get('/media/*', async (req, res, next) => {
  req.url = req.url.replace('/media/', '/api/tina/media/')
  try {
    await tinaBackend(req, res)
  } catch (e) {
    next(e)
  }
})

export const handler = ServerlessHttp(app)