import * as actions from '../../store/actions';
import useFavorite from '../hooks/useFavorite';
import { getArticle, deleteArticle } from '../../store/actions';
import LoadingIndicator from '../loadingIndicator';
import ErrorAlert from '../errorAlert';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { Button, message, Popconfirm } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { Link, withRouter } from 'react-router-dom';
import './article-full.scss';

function ArticleFull({ userData, slug, history, isLoggedIn }) {
  const [article, setArticle] = useState();
  const [status, setStatus] = useState('loading');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    getArticle(slug)
      .then((art) => {
        setStatus('fetched');
        setArticle(art);
        setIsMounted(true);
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  const { isFavorite, favorites, onFavoriteClick, setIsFavorite, setFavorites, toastError } = useFavorite(
    null,
    null,
    slug
  );

  useEffect(() => {
    if (isMounted) {
      setIsFavorite(article.favorited);
      setFavorites(article.favoritesCount);
    }
  }, [isMounted, article?.favorited, article?.favoritesCount, setIsFavorite, setFavorites]);

  if (status === 'error') return <ErrorAlert />;

  if (status === 'loading') return <LoadingIndicator />;

  const {
    title,
    body,
    description,
    tagList,
    createdAt,
    author: { username, image },
  } = article;
  const tags = Object.values(tagList).map((tagItem) =>
    tagItem.tag.length === 0 ? null : (
      <li key={tagItem.id} className="tag">
        {tagItem.tag}
      </li>
    )
  );
  const publishDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const confirm = () => {
    deleteArticle(slug).then((res) => {
      if (res.ok) {
        history.push('/');
        message.success('Deleted successfully');
      } else {
        message.error('Failed. Try one more time');
      }
    });
  };
  const cancel = () => {
    message.error('You clicked no');
  };

  const editButtonsClass = classNames({
    articleFull__editButtons: true,
    'articleFull__editButtons--show': username === userData.username,
  });

  return (
    <div className="articleFull">
      <div className="articleFull__header">
        <div className="articleFull__detailsWrapper">
          <div className="articleFull__articleDetails">
            <div className="articleFull__articleTitle">
              <div className="articleFull__title">{title}</div>
              <Button
                type="text"
                icon={isFavorite ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
                onClick={isLoggedIn ? onFavoriteClick : toastError}
              >
                {favorites}
              </Button>
            </div>
            <ul className="tagList">{tags}</ul>
          </div>
          <div className="articleFull__publishDetails">
            <div>
              <div className="articleFull__authorName">{username}</div>
              <div className="articleFull__publishDate">{publishDate}</div>
            </div>
            <img src={image} className="articleFull__profilePic" alt="profile pic" />
          </div>
        </div>

        <div className="articleFull__description">
          {description}
          <div className={editButtonsClass}>
            <Popconfirm
              title="Delete the article"
              description="Are you sure to delete this article?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button type="button" className="articleFull__deleteButton">
                Delete
              </button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`} type="button" className="articleFull__editButton">
              Edit
            </Link>
          </div>
        </div>
      </div>
      <div className="articleFull__fullText">
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={body} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userData: state.userData,
});

export default connect(mapStateToProps, actions)(withRouter(ArticleFull));
