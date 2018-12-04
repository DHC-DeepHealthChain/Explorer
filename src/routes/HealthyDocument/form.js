import React, { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
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
@Form.create()
export default class From extends PureComponent {
  handleSubmit = (e) => {
    const { formSubmit } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formSubmit(JSON.stringify(values));
      }
    });
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
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
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}
