import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_b5oujBlHEVtytu5saR6SOLDKurGWZCEa7UMao6s2d1hPkM5ClL1mezjBOk38LbYy';

const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
export function fetchBreeds() {
  return axios.get(BASE_URL);
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = `https://api.thecatapi.com/v1/images/search`;
  const queryParams = new URLSearchParams({ breed_ids: breedId });
  return axios.get(`${BASE_URL}?${queryParams}`);
}
