import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Web3 from 'web3';
import { provider } from '../../../utils/config';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class TransactionDetail extends Component {
  state = {}

  componentWillMount() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }
  componentDidMount() {
    const { location } = this.props;
    const match = pathToRegexp('/transactions/:id').exec(location.pathname);
    console.log(match);
    this.web3.eth.getTransaction(match[1], (err, res) => {
      console.log(res);
    });
  }
  web3 = null;
  render() {
    return (
      <PageHeaderLayout>
        <Card>aa</Card>
      </PageHeaderLayout>
    );
  }
}
