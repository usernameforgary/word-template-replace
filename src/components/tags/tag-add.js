import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, message} from 'antd'
import LayoutDefault from '../layouts/layout-default'
import {tagFormSubmit} from '../../reducers/tag'

const FormItem = Form.Item

class TagAdd extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.tagFormSubmit(values)
        //TODO
        message.success('Add new tag successfully')
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <LayoutDefault>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label={(<span>Tag Key</span>)}
          >
            {getFieldDecorator('tagKey', {
              rules: [
                {
                  required: true,
                  message: "Please input your tag key"
                },
                {
                  pattern: new RegExp('\\w', 'g'),
                  message: 'Tag key only allow alphanumeric characters or underscore'
                }
              ],
            })(
              <Input placeholder="Input your tag key" />
            )}
          </FormItem>
          <FormItem
            label={(<span>Tag value</span>)}
          >
            {getFieldDecorator('tagValue', {
              rules: [
                {
                  required: true,
                  message: "Please input your tag value"
                }
              ],
            })(
              <Input placeholder="Input your tag value" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      </LayoutDefault>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  tagFormSubmit: (tagData) => dispatch(tagFormSubmit(tagData))
})

export default connect(null, mapDispatchToProps)(Form.create()(TagAdd))