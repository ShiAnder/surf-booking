// src/app/api/blobs/route.js
import { list } from '@vercel/blob';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || '';

    const { blobs } = await list({
      prefix: prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Filter out blobs that are directories or empty
    const filteredBlobs = blobs.filter(blob => {
      return blob.size > 0 && !blob.pathname.endsWith('/');
    });

    console.log('Filtered blobs:', filteredBlobs);

    return Response.json({ blobs: filteredBlobs });
  } catch (error) {
    console.error('Error fetching blobs:', error);
    return Response.json({ error: 'Failed to fetch blobs' }, { status: 500 });
  }
}
