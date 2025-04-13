// src/app/api/upload/route.js
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request) {
  try {
    const data = await request.formData();
    const files = data.getAll('files'); // Permitimos múltiples archivos

    const uploadDir = join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true }); // Crear el directorio si no existe

    const filePaths = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const path = join(uploadDir, fileName);
      await writeFile(path, buffer);
      filePaths.push(`/uploads/${fileName}`);
    }

    return new Response(JSON.stringify({ filePaths }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload files' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}