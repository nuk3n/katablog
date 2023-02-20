const rootUrl = 'https://blog.kata.academy/api';

export const getArticle = async (slug) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(`${rootUrl}/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const { article } = await request.json();
  return article;
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

export const editProfile = async (username, email, password, image) => {
  const token = JSON.parse(localStorage.getItem('token'));
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

export const createArticle = async (title, description, body, tagList) => {
  const token = JSON.parse(localStorage.getItem('token'));
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
  const token = JSON.parse(localStorage.getItem('token'));
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

export const deleteArticle = async (slug) => {
  const token = JSON.parse(localStorage.getItem('token'));
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

export const favoriteArticle = async (slug) => {
  const token = JSON.parse(localStorage.getItem('token'));
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
  const token = JSON.parse(localStorage.getItem('token'));
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
