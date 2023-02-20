import useFavorite from '../hooks/useFavorite';
import { Button } from 'antd';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import './article-short.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

function ArticleShort({
  articleInfo: {
    title,
    slug,
    favoritesCount,
    favorited,
    description,
    tagList,
    createdAt,
    author: { username, image },
  },
  history,
  isLoggedIn,
}) {
  const { isFavorite, favorites, onFavoriteClick, toastError } = useFavorite(favorited, favoritesCount, slug);
  const tags = tagList.map((tag) =>
    tag.length === 0 ? null : (
      <li key={uuid()} className="tag">
        {tag}
      </li>
    )
  );
  const publishDate = format(new Date(createdAt), 'MMMM d, yyyy');

  return (
    <div className="shortArticle">
      <div className="shortArticle__info">
        <div className="shortArticle__header">
          <button type="button" className="shortArticle__headerTitle" onClick={() => history.push(`/articles/${slug}`)}>
            {title}
          </button>
          <Button
            type="text"
            icon={isFavorite ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
            onClick={isLoggedIn ? onFavoriteClick : toastError}
          >
            {favorites}
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(withRouter(ArticleShort));
