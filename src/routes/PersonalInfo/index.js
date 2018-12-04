import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Divider, Button, Modal, Input, message, List } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Description } = DescriptionList;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@connect(({ personalInfo, loading, user }) => ({
  personalInfo,
  user,
  loading: loading.effects['personalInfo/fetchBasic'],
}))
export default class PersonalInfo extends Component {
  state = {
    modalVisible: false,
    address: '',
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const basic = dispatch({
      type: 'personalInfo/fetchBasic',
      payload: {
        id: localStorage.userId,
      },
    });
    basic.then(() => {
      const { user: { currentUser } } = this.props;
      dispatch({
        type: 'personalInfo/accountList',
        payload: {
          username: currentUser.username,
        },
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleValueChange = (e) => {
    this.setState({
      address: e.target.value,
    });
  }

  handleAdd = () => {
    const { address } = this.state;
    const { dispatch, user: { currentUser } } = this.props;
    if (!address) {
      message.error('请输入地址');
      return false;
    }
    const update = dispatch({
      type: 'personalInfo/updateAccount',
      payload: {
        address,
        username: currentUser.username,
      },
    });
    update.then(() => {
      this.handleModalVisible();
      dispatch({
        type: 'personalInfo/accountList',
        payload: {
          username: this.props.user.currentUser.username,
        },
      });
    });
  }

  renderItem = (item) => {
    return (
      <DescriptionList
        size="large"
        style={{ marginBottom: 32 }}
        col={1}
      >
        <Description term="用户地址">{item.address}</Description>
        <Description term="添加时间">{moment(item.createdAt).format(dateFormat)}</Description>
        <Description term="账户余额">{item.balance}</Description>
        <Divider style={{ marginBottom: 10 }} />
      </DescriptionList>
    );
  }
  render() {
    const { modalVisible } = this.state;
    const { personalInfo: { info, accountList } } = this.props;
    return (
      <PageHeaderLayout>
        <Modal
          title="添加地址"
          destroyOnClose
          maskClosable={false}
          visible={modalVisible}
          onCancel={() => { this.handleModalVisible(); }}
          onOk={this.handleAdd}
        >
          <Input placeholder="请输入地址" onChange={this.handleValueChange} />
        </Modal>
        <Card title="个人信息" bordered={false}>
          <DescriptionList
            size="large"
            style={{ marginBottom: 32 }}
            col={1}
          >
            <Description term="用户姓名">{info.username}</Description>
            <Description term="注册时间">{moment(info.createdAt).format(dateFormat)}</Description>
            <Description term="公钥地址">{info.publicKey}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <Button onClick={() => { this.handleModalVisible(true); }} type="primary">添加地址</Button>
        </Card>
        <Card title="观察地址" style={{ marginTop: '24px' }}>
          <List
            // bordered
            dataSource={accountList}
            renderItem={item => this.renderItem(item)}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
