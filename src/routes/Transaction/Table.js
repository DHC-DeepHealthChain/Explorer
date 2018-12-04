import React from 'react';
import { Table } from 'antd';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import styles from './Table.less';

const eth = new BigNumber(1000000000000000000);
const Gwei = new BigNumber(1000000000);
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export default ({ list, addressClick, ...tableProps }) => {
  const columns = [
    {
      title: 'from',
      dataIndex: 'from',
      key: 'from',
      width: 150,
      render: val => (
        <a onClick={() => { addressClick(val); }}>{val}</a>
      ),
    },
    {
      title: 'to',
      dataIndex: 'to',
      key: 'to',
      width: 150,
      render: val => (
        <a onClick={() => { addressClick(val); }}>{val}</a>
      ),
    },
    {
      title: 'value(eth)',
      dataIndex: 'value',
      key: 'value',
      render: val => (
        new BigNumber(val).dividedBy(eth).toNumber()
      ),
    },
    {
      title: 'nonce',
      dataIndex: 'nonce',
      key: 'nonce',
    },
    {
      title: 'gas',
      dataIndex: 'gas',
      key: 'gas',
    },
    {
      title: 'hash',
      dataIndex: 'hash',
      key: 'hash',
      width: 150,
    },
    {
      title: 'gasPrice(Gwei)',
      dataIndex: 'gasPrice',
      key: 'gasPrice',
      render: val => (
        new BigNumber(val).dividedBy(Gwei).toNumber()
      ),
    },
    {
      title: 'timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: val => (
        moment(new Date(val)).format(dateFormat)
      ),
    },
  ];

  return (
    <div className={styles.standardTable}>
      <Table
        rowKey={record => record.hash}
        dataSource={list}
        columns={columns}
        scroll={{ x: 1200 }}
        {...tableProps}
      />
    </div>
  );
};
