import { getToken, setToken, removeToken } from './local-storage-API';
import uuid from 'react-uuid';

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
      const token = getToken();
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
    setToken(token);
    dispatch(setUserData(username, email, image));
    dispatch(setIsLoggedIn(true));
  }
  return response;
};

export const checkUser = () => async (dispatch) => {
  const token = getToken();
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
    setToken(token);
    dispatch(setUserData(username, email, image));
    dispatch(setIsLoggedIn(true));
    dispatch(setStatus('fetched'));
  }
  if (request.status === 401) {
    dispatch(setIsLoggedIn(false));
    dispatch(setUserData(null, null, null));
    removeToken();
  }
};

export const getArticle = async (slug) => {
  const token = getToken();
  const request = await fetch(`${rootUrl}/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const { article } = await request.json();
  const modifiedTags = article.tagList.map((tag) => ({
    tag,
    id: uuid(),
  }));
  return { ...article, tagList: modifiedTags };
};

export const deleteArticle = async (slug) => {
  const token = getToken();
  const response = await fetch(`${rootUrl}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  return response;
};

export const createArticle = async (title, description, body, tagList) => {
  const token = getToken();
  const response = await fetch(`${rootUrl}/articles`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });
  return response;
};

export const editArticle = async (title, description, body, tagList, slug) => {
  const token = getToken();
  const response = await fetch(`${rootUrl}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });
  return response;
};

export const editProfile = async (username, email, password, image) => {
  const token = getToken();
  const request = await fetch(`${rootUrl}/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
        image,
      },
    }),
  });
  const response = await request.json();
  return response;
};

export const registerUser = async (username, email, password) => {
  const request = await fetch(`${rootUrl}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  });
  const response = await request.json();
  return response;
};

export const favoriteArticle = async (slug) => {
  const token = getToken();
  const request = await fetch(`${rootUrl}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const response = await request.json();
  return response;
};

export const unfavoriteArticle = async (slug) => {
  const token = getToken();
  const request = await fetch(`${rootUrl}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const response = await request.json();
  return response;
};
