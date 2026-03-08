/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Handler } from '@netlify/functions'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const handler: Handler = async (event) => {
  const method = event.httpMethod

  if (method === 'GET') {
    const { limit = '36', offset, directory = '' } = event.queryStringParameters || {}
    const result = await cloudinary.search
      .expression(directory ? `folder:${directory}/*` : '')
      .max_results(parseInt(limit))
      .next_cursor(offset || '')
      .execute()

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: result.resources.map((r: any) => ({
          type: 'file',
          id: r.public_id,
          filename: r.filename || r.public_id.split('/').pop(),
          directory: '/',
          thumbnails: {
            '75x75': r.secure_url,
            '400x400': r.secure_url,
            '1000x1000': r.secure_url,
          },
          src: r.secure_url,
        })),
        offset: result.next_cursor,
      }),
    }
  }

  if (method === 'DELETE') {
    const id = decodeURIComponent(event.path.split('/').pop() || '')
    await cloudinary.uploader.destroy(id)
    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  }

  if (method === 'POST') {
    // Upload handled via Cloudinary unsigned upload or signed
    return { statusCode: 405, body: JSON.stringify({ message: 'Use signed upload' }) }
  }

  return { statusCode: 405, body: 'Method not allowed' }
}