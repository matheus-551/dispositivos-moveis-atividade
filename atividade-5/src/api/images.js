import { create } from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL;
const api = create({ baseURL, timeout: 15000 });

async function getAuthHeaders(user) {
  if (!baseURL) {
    throw new Error('Configure EXPO_PUBLIC_API_URL.');
  }

  return { Authorization: `Bearer ${await user.getIdToken()}` };
}

export async function listImages(user, cursor, signal) {
  const { data } = await api.get('/images', {
    headers: await getAuthHeaders(user),
    params: { cursor },
    signal,
  });

  return data;
}

export async function deleteImage(user, publicId) {
  await api.delete('/images', {
    headers: await getAuthHeaders(user),
    data: { publicId },
  });
}
