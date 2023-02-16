/* eslint-disable */
import * as actions from '../../../store/actions';
import { useEffect, useState } from 'react';
import { getArticle } from '../../../requests/requests';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import './article-full.scss';
import LoadingIndicator from '../../loadingIndicator';
import ErrorAlert from '../../errorAlert';

function ArticleFull({ slug }) {
  const [article, setArticle] = useState();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getArticle(slug)
      .then((art) => {
        setStatus('fetched');
        setArticle(art);
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'error') return <ErrorAlert />;

  if (status === 'loading') return <LoadingIndicator />;

  const {
    title,
    favoritesCount,
    body,
    description,
    tagList,
    createdAt,
    author: { username, image },
  } = article;

  const tags = tagList.map((tag) =>
    tag.length === 0 ? null : (
      <li key={uuid()} className="tag">
        {tag}
      </li>
    )
  );
  const publishDate = format(new Date(createdAt), 'MMMM d, yyyy');

  return (
    <div className="articleFull">
      <div className="articleFull__preview">
        <div className="articleFull__info">
          <div className="articleFull__header">
            <div className="articleFull__headerTitle">{title}</div>
            <Button type="text" icon={<HeartOutlined />}>
              {favoritesCount}
            </Button>
          </div>
          <ul className="tagList">{tags}</ul>
          <div className="articleFull__text"> {description}</div>
        </div>
        <div className="articleFull__publishInfo">
          <div className="articleFull__publishDetails">
            <div className="articleFull__authorName">{username}</div>
            <div className="articleFull__publishDate">{publishDate}</div>
          </div>
          <img src={image} className="articleFull__profilePic" alt="profile pic" />
        </div>
      </div>
      <div className="articleFull__fullText">
        <ReactMarkdown children={body} />
      </div>
    </div>
  );
}

export default connect(null, actions)(ArticleFull);
