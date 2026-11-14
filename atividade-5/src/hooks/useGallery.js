import { useCallback, useEffect, useRef, useState } from 'react';

import { deleteImage, listImages } from '../api/images';
import { auth } from '../services/firebase';

export default function useGallery(user, setMessage) {
  const [images, setImages] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const pendingList = useRef(null);
  const pendingDelete = useRef(false);

  const load = useCallback(async (nextCursor) => {
    if (pendingList.current || pendingDelete.current) {
      return;
    }

    const request = new AbortController();
    pendingList.current = request;
    setLoading(true);
    setMessage('');

    try {
      const data = await listImages(user, nextCursor, request.signal);

      if (!request.signal.aborted) {
        setImages((current) => (nextCursor ? [...current, ...data.images] : data.images));
        setCursor(data.nextCursor);
      }
    } catch (error) {
      if (!request.signal.aborted) {
        setMessage(error.response?.data?.error || error.message);
      }
    } finally {
      if (pendingList.current === request) {
        pendingList.current = null;
        setLoading(false);
      }
    }
  }, [user, setMessage]);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) {
        load();
      }
    });

    return () => {
      active = false;
      pendingList.current?.abort();
      pendingList.current = null;
    };
  }, [load]);

  async function remove(publicId) {
    if (pendingDelete.current) {
      return false;
    }

    pendingDelete.current = true;
    setDeleting(true);

    try {
      pendingList.current?.abort();
      await deleteImage(user, publicId);
      setImages((current) => current.filter((image) => image.publicId !== publicId));
    } catch (error) {
      if (user === auth.currentUser) {
        setMessage(error.response?.data?.error || 'Não foi possível excluir a imagem.');
      }
    } finally {
      pendingDelete.current = false;
      setDeleting(false);
    }

    return true;
  }

  return { images, cursor, loading, deleting, load, remove };
}
