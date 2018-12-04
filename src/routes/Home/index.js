import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
// import { Avatar, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BlockTable from './blockTable';
import TransactionTable from './transactionTable';

// import styles from './index.less';

@connect(({ home, user }) => ({
  home,
  user,
}))
export default class Home extends Component {
  componentDidMount() {
    this.getBlockList();
    // this.getTransaction();
  }

  componentWillReceiveProps(nextProps) {
    const { user: { currentUser } } = nextProps;
    if (currentUser.username && !this.isLoad) {
      this.isLoad = true;
      this.getTransaction();
    }
  }

  getBlockList = (page = 0, pageSize = 10) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getBlock',
      payload: {
        page,
        pageSize,
      },
    });
  }

  getTransaction = (page = 0, pageSize = 10) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getTransaction',
      payload: {
        page,
        pageSize,
        token: localStorage.address,
      },
    });
  }

  isLoad = false;

  uploadDocument = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/healthyDocument'));
  }

  render() {
    const { dispatch, home: { loading, list, transaction,
      transactionLoading, pagination, transactionPagination } } = this.props;
    const { user: { currentUser } } = this.props;
    // const pageHeaderContent = (
    //   <div className={styles.pageHeaderContent}>
    //     <div className={styles.avatar}>
    //       <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
    //     </div>
    //     <div className={styles.content}>
    //       <div className={styles.contentTitle}>姓名：{localStorage.user}</div>
    //       <Link to="/personalInfo">查看个人信息</Link>
    //     </div>
    //     <Button
    //       size="large"
    //       type="primary"
    //       onClick={this.uploadDocument}
    //     >
    //       上传健康档案
    //     </Button>
    //   </div>
    // );
    const blockTableProps = {
      list,
      loading,
      pagination,
      title: () => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ paddingLeft: '16px' }}>区块信息</h3>
          {
            !currentUser.username ? <Link style={{ paddingRight: '16px' }} to="/transactions/list">全部交易</Link> : null
          }
        </div>
      ),
      onChange: (page) => {
        // 分页查询
        this.getBlockList(page.current, page.pageSize);
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

    const transactionTableProps = {
      list: transaction,
      loading: transactionLoading,
      pagination: transactionPagination,
      title: () => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ paddingLeft: '16px' }}>我的交易信息</h3>
          <Link style={{ paddingRight: '16px' }} to="/transactions/list">全部交易</Link>
        </div>
      ),
      addressClick: (address) => {
        dispatch(routerRedux.push({
          pathname: `/personalTransaction/list/${address}`,
          query: {
            address,
          },
        }));
      },
      onChange: (page) => {
        // 分页查询
        this.getTransaction(page.current, page.pageSize);
      },

    };

    return (
      // <PageHeaderLayout
      //   content={pageHeaderContent}
      // >
      <PageHeaderLayout>
        {
          currentUser.username ? <TransactionTable {...transactionTableProps} /> : null
        }
        <BlockTable {...blockTableProps} />
      </PageHeaderLayout>
    );
  }
}
