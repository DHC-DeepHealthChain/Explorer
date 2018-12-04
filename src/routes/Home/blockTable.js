import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import styles from './Table.less';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export default ({ list, addressClick, ...tableProps }) => {
  const columns = [
    {
      title: 'Height',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
      render: val => (
        moment(new Date(val * 1000)).format(dateFormat)
      ),
    },
    {
      title: 'Miner',
      dataIndex: 'miner',
      key: 'miner',
      render: val => (
        <a onClick={() => { addressClick(val); }}>{val}</a>
      ),
    },
    {
      title: 'GasUsed',
      dataIndex: 'gasUsed',
      key: 'gasUsed',
    },
    {
      title: 'GasLimit',
      dataIndex: 'gasLimit',
      key: 'gasLimit',
    },
  ];

  return (
    <div className={styles.standardTable}>
      <Table
        rowKey={record => record.hash}
        dataSource={list}
        columns={columns}
        {...tableProps}
      />
    </div>
  );
};
