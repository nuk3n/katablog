/* eslint-disable */
const rootUrl = 'https://blog.kata.academy/api/';

const setArticlesList = (articles, total) => ({
  type: 'setArticles',
  articles,
  total,
});

export const getArticles =
  (page = 1) =>
  async (dispatch) => {
    const offset = (page - 1) * 20;
    const request = await fetch(`${rootUrl}/articles?&offset=${offset}`);
    const { articles, articlesCount } = await request.json();
    dispatch(setArticlesList(articles, articlesCount));
  };

export const getArticle = (slug) => async (dispatch) => {
  const request = await fetch(`${rootUrl}/articles/${slug}`);
  const { article } = await request.json();
  console.log(article);
  return article;
};
