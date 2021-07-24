async (query) => {

  const { axios } = npm

  const username = 'php_prog'
  const password = 'saS8jz3BR3'

  const searchParams = {
    'scraper': 'google_search',
    'domain': 'com',
    'q': query,
    'parse': 'true',
  }

  return axios.post('https://rt.serpmaster.com', searchParams, {
    auth: { username, password }
  }).then(res => res.data.results)
}