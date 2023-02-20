import './edit-article-page.scss';
import ArticlePage from '../article-page';
import { getArticle, editArticle } from '../../requests/requests';
import ErrorAlert from '../errorAlert';
import LoadingIndicator from '../loadingIndicator';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function EditArticlePage({ slug, status }) {
  const [article, setArticle] = useState();
  const [pageStatus, setPageStatus] = useState('loading');

  useEffect(() => {
    getArticle(slug)
      .then((art) => {
        setPageStatus('fetched');
        setArticle(art);
      })
      .catch(() => setPageStatus('error'));
  }, [slug]);

  if (status === 'loading') return <LoadingIndicator />;

  if (pageStatus === 'error') return <ErrorAlert />;

  if (pageStatus === 'loading') return <LoadingIndicator />;

  return <ArticlePage slug={slug} status={status} pageStatus="edit" article={article} submitArticle={editArticle} />;
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(EditArticlePage);
