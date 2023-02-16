const initialState = {
  articles: [],
  totalArticles: 1,
  status: 'loading',
  userData: {
    username: null,
    email: null,
    image: null,
  },
  isLoggedIn: false,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  const SET_ARTICLES = 'setArticles';
  const SET_STATUS = 'setStatus';
  const SET_USER_DATA = 'setUserData';
  const SET_IS_LOGGED_IN = 'setIsLoggedIn';
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articles: action.articles, totalArticles: action.total };
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_USER_DATA:
      return { ...state, userData: action.userData };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.status };
    default:
      return state;
  }
};

export default reducer;
