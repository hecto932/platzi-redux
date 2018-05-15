function data (state, action) {
  switch (action.type) {
    case 'SEARCH_VIDEO': {
      let results = []
      const author = action.payload.query.toLowerCase()
      const { categories } = state.data

      if (action.payload.query) {
        categories.forEach((category) => {
          results = results.concat(category.playlist.filter((item => {
            return item.author.toLowerCase().includes(author)
          })))
        })
      }

      return {
        ...state,
        search: results
      }
    }
    break;
    default:
      return state
  }
}

export default data