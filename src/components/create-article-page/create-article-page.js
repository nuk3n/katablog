import './create-article-page.scss';
import ArticlePage from '../article-page';
import routes from '../routes';
import { createArticle } from '../../store/actions';
import LoadingIndicator from '../loadingIndicator';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function CreateArticlePage({ status, isLoggedIn }) {
  if (!isLoggedIn) return <Redirect to={routes.signIn} />;
  if (status === 'loading') return <LoadingIndicator />;
  return <ArticlePage submitArticle={createArticle} />;
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  status: state.status,
});

export default connect(mapStateToProps)(CreateArticlePage);
