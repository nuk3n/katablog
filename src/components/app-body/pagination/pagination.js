import * as actions from '../../../store/actions';
import { Pagination as AntdPagination } from 'antd';
import { connect } from 'react-redux';
import './pagination.scss';

function Pagination({ totalArticles, getArticles }) {
  return (
    <AntdPagination
      defaultCurrent={1}
      total={totalArticles}
      onChange={(value) => getArticles(value)}
      defaultPageSize={20}
      showSizeChanger={false}
    />
  );
}

const mapStateToProps = (state) => ({
  totalArticles: state.totalArticles,
});

export default connect(mapStateToProps, actions)(Pagination);
