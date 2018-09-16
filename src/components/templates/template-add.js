import React from 'react'
import { Form, Button, Input, Transfer, Alert } from 'antd'
import { connect } from 'react-redux'

import {
  getTransferSourceTags,
  updateSelectedTag,
  saveTemplate,
  updateAlertMessage
} from '../../reducers/template'

import LayoutDefault from '../layouts/layout-default'

const FormItem = Form.Item

class TemplateAdd extends React.Component {
  constructor(props) {
    super(props)
  }
   
  componentDidMount() {
    this.props.getTransferSourceTags()
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }

  handleChange = (targetKeys, direction) => {
    this.props.updateSelectedTag(targetKeys, direction)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.tags = this.props.selectedTags
        this.props.saveTemplate(values)
      }
    });
  }

  closeAlertMsg = () => {
    this.props.updateAlertMessage('')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    
    return (
      <LayoutDefault>
        {
          (this.props.addMessage) ? (
            <Alert
              message= {this.props.addMessage}
              type= {this.props.messageType}
              closable
              afterClose={this.closeAlertMsg}
            />
          ) : null
        }
        
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label={(<span>Template Name</span>)}
          >
            {getFieldDecorator('templateName', {
              rules: [
                {
                  required: true,
                  message: "Please input your template name"
                }
              ],
            })(
              <Input placeholder="Input your template name" />
            )}
          </FormItem>
          <FormItem
            label={(<span>Select Tags</span>)}
          >
            <Transfer
              listStyle={{
                width: 250,
                height: 350,
              }}
              dataSource={this.props.sourceTags}
              showSearch
              filterOption={this.filterOption}
              targetKeys={this.props.selectedTags}
              onChange={this.handleChange}
              render={item => item.title}
            />    
          </FormItem>
          
          <FormItem>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      </LayoutDefault>
    )
  }
}

const mapStateToProps = state => ({
  sourceTags: state.templates.addTemplate.sourceTags,
  selectedTags: state.templates.addTemplate.selectedTags,
  addMessage: state.templates.addTemplate.addMessage,
  messageType: state.templates.addTemplate.messageType,
})

const mapDispatchToProps = dispatch => ({
  getTransferSourceTags: () => dispatch(getTransferSourceTags()),
  updateSelectedTag: (targetKeys, direction) => dispatch(updateSelectedTag(targetKeys, direction)),
  saveTemplate: (templateData) => dispatch(saveTemplate(templateData)),
  updateAlertMessage: (msg, msgType) => dispatch(updateAlertMessage(msg, msgType))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TemplateAdd))