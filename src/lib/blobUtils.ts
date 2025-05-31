// src/lib/blobUtils.ts

// Define types for better type safety
interface BlobItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  [key: string]: unknown;
}

interface BlobResponse {
  blobs: BlobItem[];
}

export async function getBlobs(prefix: string): Promise<BlobItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blob?prefix=${encodeURIComponent(prefix)}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blobs: ${res.statusText}`);
    }

    const { blobs }: BlobResponse = await res.json();
    return blobs;
  } catch (error) {
    console.error('Error fetching blobs from API route:', error);
    return [];
  }
}

export function getBlobFilename(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}