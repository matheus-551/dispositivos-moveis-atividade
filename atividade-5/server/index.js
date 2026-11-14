import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import express from 'express';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const requiredVariables = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'CLOUDINARY_ASSET_FOLDER',
  'GOOGLE_APPLICATION_CREDENTIALS',
];

for (const key of requiredVariables) {
  if (!process.env[key]) {
    throw new Error(`Configure ${key} no .env do servidor.`);
  }
}

initializeApp({ credential: applicationDefault() });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
const folder = process.env.CLOUDINARY_ASSET_FOLDER;

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(requireAuthentication);

async function requireAuthentication(req, res, next) {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];

  if (!token) {
    return res.status(401).json({ error: 'Autenticação necessária.' });
  }

  try {
    await getAuth().verifyIdToken(token, true);
  } catch {
    return res.status(401).json({ error: 'Sessão inválida. Entre novamente.' });
  }

  next();
}

app.get('/images', async (req, res) => {
  const { cursor } = req.query;

  if (cursor && (typeof cursor !== 'string' || cursor.length > 2048)) {
    return res.status(400).json({ error: 'Cursor inválido.' });
  }

  try {
    const result = await cloudinary.api.resources_by_asset_folder(folder, {
      max_results: 50,
      next_cursor: cursor,
    });
    const images = result.resources
      .filter((resource) => resource.resource_type === 'image' && resource.type === 'upload')
      .map((resource) => ({
        publicId: resource.public_id,
        name: resource.display_name || resource.original_filename || resource.public_id.split('/').pop(),
        url: resource.secure_url,
      }));

    res.json({ images, nextCursor: result.next_cursor || null });
  } catch (error) {
    console.error(error.message);
    res.status(502).json({ error: 'Não foi possível listar as imagens do Cloudinary.' });
  }
});

app.delete('/images', async (req, res) => {
  const { publicId } = req.body || {};

  if (typeof publicId !== 'string' || !publicId.trim() || publicId.length > 1024) {
    return res.status(400).json({ error: 'Identificador inválido.' });
  }

  try {
    const imageType = { resource_type: 'image', type: 'upload' };
    const image = await cloudinary.api.resource(publicId, imageType);

    if (image.asset_folder !== folder) {
      return res.status(403).json({ error: 'Imagem fora da pasta permitida.' });
    }

    const result = await cloudinary.uploader.destroy(publicId, { ...imageType, invalidate: true });

    if (!['ok', 'not found'].includes(result.result)) {
      throw new Error('Exclusão não confirmada.');
    }

    res.status(204).end();
  } catch (error) {
    console.error(error.message);
    res.status(error.http_code === 404 ? 404 : 502).json({
      error: 'Não foi possível excluir a imagem.',
    });
  }
});

app.listen(Number(process.env.PORT) || 3001, '0.0.0.0', () => {
  console.log('API da galeria iniciada.');
});
