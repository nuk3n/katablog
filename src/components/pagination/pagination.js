import * as actions from '../../store/actions';
import { Pagination as AntdPagination } from 'antd';
import { connect } from 'react-redux';
import './pagination.scss';
import { withRouter } from 'react-router-dom';

function Pagination({ totalArticles, getArticles, history, currentPage = 1 }) {
  return (
    <AntdPagination
      defaultCurrent={currentPage}
      total={totalArticles}
      onChange={(value) => {
        getArticles(value);
        history.push(`/${value}`);
      }}
      defaultPageSize={20}
      showSizeChanger={false}
    />
  );
}

const mapStateToProps = (state) => ({
  totalArticles: state.totalArticles,
});

export default connect(mapStateToProps, actions)(withRouter(Pagination));
