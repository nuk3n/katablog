/* eslint-disable */
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import './article-short.scss';
import { Link, withRouter } from 'react-router-dom';

function ArticleShort({
  articleInfo: {
    title,
    slug,
    favoritesCount,
    description,
    tagList,
    createdAt,
    author: { username, image },
  },
  history,
}) {
  const tags = tagList.map((tag) =>
    tag.length === 0 ? null : (
      <li key={uuid()} className="tag">
        {tag}
      </li>
    )
  );
  const publishDate = format(new Date(createdAt), 'MMMM d, yyyy');

  return (
    <div className="appBody__shortArticle">
      <div className="shortArticle__info">
        <div className="shortArticle__header">
          <div className="shortArticle__headerTitle" onClick={() => history.push(`/articles/${slug}`)}>
            {title}
          </div>
          <Button type="text" icon={<HeartOutlined />}>
            {favoritesCount}
          </Button>
        </div>
        <ul className="tagList">{tags}</ul>
        <div className="shortArticle__text"> {description}</div>
      </div>
      <div className="shortArticle__publishInfo">
        <div className="shortArticle__publishDetails">
          <div className="shortArticle__authorName">{username}</div>
          <div className="shortArticle__publishDate">{publishDate}</div>
        </div>
        <img src={image} className="shortArticle__profilePic" alt="profile pic" />
      </div>
    </div>
  );
}

export default withRouter(ArticleShort);
