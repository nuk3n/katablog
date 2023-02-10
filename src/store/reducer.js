const initialState = {
  articles: [],
  totalArticles: 1,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  const SET_ARTICLES = 'setArticles';
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articles: action.articles, totalArticles: action.total };
    default:
      return state;
  }
};

export default reducer;
