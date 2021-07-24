({
  access:"public",
  method: async ({ query }) => {
    if(!query || !query.length) {
      return new Error ('query parameter is required')
    }
    const cached = await lib.redis.get(`videos/search/${query}`);
    // console.log(cached)
    if (cached) {
      return JSON.parse(cached);
    }
    const allowedSites = ['https://www.youtube.com/watch?v=']
    const filterSearchResult = item => allowedSites.find(site => item.url.includes(site))
    return await lib
      .serpmaster
      .search(query)
      .then(response => response[0].content.results.organic)
      .then(results => results.filter(filterSearchResult))
      .then(results => results.map(result => {
        const videoId = result.url.substr(-11, 11)
        return {
          ...result,
          thumbnail: `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
        };
      }))
      .then(async results => {
        lib.redis.set(`videos/search/${query}`, JSON.stringify(results))
        return results;
      })
  }
})