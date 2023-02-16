const rootUrl = 'https://blog.kata.academy/api';

export const getArticle = async (slug) => {
  const request = await fetch(`${rootUrl}/articles/${slug}`);
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
