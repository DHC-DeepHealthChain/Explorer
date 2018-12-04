import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, message, Icon, Upload } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Dragger } = Upload;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};
@connect(({ healthyDocument }) => ({
  healthyDocument,
}))
@Form.create()
export default class HealthyDocument extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <PageHeaderLayout title="上传健康档案" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入姓名',
                }],
              })(
                <Input placeholder="姓名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="年龄"
            >
              {getFieldDecorator('age', {
                rules: [{
                  required: true, message: '请输入年龄',
                }],
              })(
                <Input placeholder="年龄" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: '请输入地址',
                }],
              })(
                <Input placeholder="地址" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上传文件"
            >
              {
                getFieldDecorator('file', {
                  rules: [{
                    required: true, message: '请上传文件',
                  }],
                })(
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  </Dragger>
                )
              }
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}

