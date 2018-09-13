import React from 'react'
import DefaultLayout from '../layouts/layout-default'
import { connect } from 'react-redux'

import {
  updateFilesTemplate,
  closeErrorMsg,
  exportFile,
} from '../../reducers/export'

import { Form, Select, Button, Alert} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.closeAlertMsg = this.closeAlertMsg.bind(this)
  }

  componentDidMount() {
    this.props.updateFilesTemplate()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.exportFile(values.file, values.template)
      }
    });
  }

  closeAlertMsg() {
    this.props.closeErrorMsg()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <DefaultLayout>
        {
          (this.props.exportErrorMsg) ? (
            <Alert
              message= {this.props.exportErrorMsg}
              type="error"
              closable
              afterClose={this.closeAlertMsg}
            />
          ) : null
        }
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label={(<span>File</span>)}
          >
            {getFieldDecorator('file', {
              rules: [
                {
                  required: true,
                  message: "Please select your file"
                }
              ],
            })(
              <Select
                showSearch
                
              >
                {
                  this.props.files.map(file => 
                    (<Option
                      key={file._id} 
                      value={file.file_name}
                     >{file.file_name}</Option>)
                )}
              </Select>
            )}
          </FormItem>

          <FormItem
            label={(<span>Template</span>)}
          >
            {getFieldDecorator('template', {
              rules: [
                {
                  required: true,
                  message: "Please select your template"
                }
              ],
            })(
              <Select
                showSearch
              >
                {
                  this.props.templates.map(template => 
                    (<Option 
                      key={template._id} 
                      value={template.name}
                     >{template.name}</Option>)
                )}
              </Select>
            )}
          </FormItem>
        
          <FormItem>
            <Button type="primary" htmlType="submit">Export</Button>
          </FormItem>
        </Form>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = state => ({
  files: state.files.files,
  templates: state.templates.templates,
  exportErrorMsg: state.export.exportErrorMsg
})
const mapDispatchToProps = dispatch => ({
  updateFilesTemplate: () => dispatch(updateFilesTemplate()),
  closeErrorMsg: () => dispatch(closeErrorMsg()),
  exportFile: (fileName, templateName) => dispatch(exportFile(fileName, templateName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Home))