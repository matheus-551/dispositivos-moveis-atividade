const API_URL = 'https://dummyjson.com';

const BASE_URL = 'https://dummyjson.com';

export async function getProducts({
  limit = 20,
  skip = 0,
  search = '',
  category = '',
  sortBy = '',
  order = '',
}) {
  let url;
  if (search.trim() !== '') {
    url =
      `${BASE_URL}/products/search` +
      `?q=${encodeURIComponent(search.trim())}` +
      `&limit=${limit}` +
      `&skip=${skip}`;
  } else if (category !== '') {
    url =
      `${BASE_URL}/products/category/${category}` +
      `?limit=${limit}` +
      `&skip=${skip}`;
  } else {
    url =
      `${BASE_URL}/products` +
      `?limit=${limit}` +
      `&skip=${skip}`;
  }

  if (sortBy !== '') {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  console.log('Buscando:', url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      'Erro ao buscar produtos'
    );
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(
    `${API_URL}/products/category-list`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias.');
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(
    `${API_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar produto.');
  }

  return response.json();
}
