import React, { Component } from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import TransactionTable from './Table';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

@connect(({ personalTransaction }) => ({
  personalTransaction,
}))
export default class TransactionList extends Component {
  componentDidMount() {
    this.getList();
  }

  getList = (page = 0, pageSize = 10) => {
    const { location, dispatch } = this.props;
    const match = pathToRegexp('/personalTransaction/list/:id').exec(location.pathname);
    dispatch({
      type: 'personalTransaction/fetchBasic',
      payload: {
        page,
        pageSize,
        token: match[1],
      },
    });
  }
  render() {
    const { dispatch, personalTransaction: { list, loading, pagination } } = this.props;
    const transactionTableProps = {
      list,
      loading,
      pagination,
      title: () => (
        <div>
          <h3 style={{ paddingLeft: '16px' }}>个人交易信息</h3>
        </div>
      ),
      onChange: (page) => {
        this.getList(page.current, page.pageSize);
      },
      addressClick: (address) => {
        dispatch(routerRedux.push({
          pathname: `/personalTransaction/list/${address}`,
          query: {
            address,
          },
        }));
      },
    };
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <TransactionTable {...transactionTableProps} />
        </div>
      </PageHeaderLayout>
    );
  }
}
