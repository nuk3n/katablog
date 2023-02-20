import './create-article-page.scss';
import ArticlePage from '../article-page';
import { createArticle } from '../../requests/requests';
import LoadingIndicator from '../loadingIndicator';
import { connect } from 'react-redux';

function CreateArticlePage({ status }) {
  if (status === 'loading') return <LoadingIndicator />;
  return <ArticlePage submitArticle={createArticle} />;
}

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(CreateArticlePage);
