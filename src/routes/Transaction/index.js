import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TransactionTable from './Table';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

@connect(({ transactionList }) => ({
  transactionList,
}))
export default class TransactionList extends Component {
  componentDidMount() {
    this.getList();
    // this.getTransactionsByAccount('*');
  }
  getList = (page = 0, pageSize = 10) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'transactionList/fetch',
      payload: {
        page,
        pageSize,
      },
    });
  }
  render() {
    const { dispatch, transactionList: { list, loading, pagination } } = this.props;
    const transactionTableProps = {
      list,
      loading,
      pagination,
      title: () => (
        <div>
          <h3 style={{ paddingLeft: '16px' }}>全部交易</h3>
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
