/* eslint-disable */
const rootUrl = 'https://blog.kata.academy/api';

const setArticlesList = (articles, total) => ({
  type: 'setArticles',
  articles,
  total,
});

export const setIsLoggedIn = (status) => ({
  type: 'setIsLoggedIn',
  status,
});

export const setUserData = (username, email, image = null) => ({
  type: 'setUserData',
  userData: { username, email, image },
});

const setStatus = (status) => ({
  type: 'setStatus',
  status,
});

const setUser = (user) => ({
  type: 'setUser',
  user,
});

export const getArticles =
  (page = 1) =>
  async (dispatch) => {
    const offset = (page - 1) * 20;
    try {
      const request = await fetch(`${rootUrl}/articles?&offset=${offset}`);
      const { articles, articlesCount } = await request.json();
      dispatch(setStatus('fetched'));
      dispatch(setArticlesList(articles, articlesCount));
    } catch (e) {
      dispatch(setStatus('error'));
    }
  };

export const signIn = (email, password) => async (dispatch) => {
  const request = await fetch(`${rootUrl}/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });
  const response = await request.json();
  if (!response.errors) {
    const {
      user: { username, token, image },
    } = response;
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(setUserData(username, email, image));
    dispatch(setIsLoggedIn(true));
  }
  return response;
};
