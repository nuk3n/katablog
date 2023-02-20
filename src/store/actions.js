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

export const getArticles =
  (page = 1) =>
  async (dispatch) => {
    const offset = (page - 1) * 20;
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const request = await fetch(`${rootUrl}/articles?&offset=${offset}`, {
        headers: {
          Authorization: `Token ${token}`,
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
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

export const checkUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(`${rootUrl}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  if (request.status === 200) {
    const {
      // eslint-disable-next-line no-shadow
      user: { username, token, image, email },
    } = await request.json();
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(setUserData(username, email, image));
    dispatch(setIsLoggedIn(true));
    dispatch(setStatus('fetched'));
  }
  if (request.status === 401) {
    dispatch(setIsLoggedIn(false));
    dispatch(setUserData(null, null, null));
    localStorage.removeItem('token');
  }
};
