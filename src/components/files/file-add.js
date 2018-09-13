import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, Upload, Icon, message } from 'antd'

import LayoutDefault from '../layouts/layout-default'
import { fileAdded } from '../../reducers/file'
import { SERVER_URL_FILE_ADD } from '../../consts/urls'
import { DOCX, DOC} from '../../consts/file-types'

const FormItem = Form.Item

class FileAdd extends React.Component {
  constructor(props) {
    super(props)
    this.addNewFile = this.addNewFile.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }

  addNewFile(file) {
    this.props.fileAdded(file)
  }

  beforeUpload(file) {
    if(!(file.type === DOCX)) {
      file.status = 'error'
      file.response = 'This is not a docx file'
      return false
    }
  }

  fileUpload(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
      if(!info.file.response.payload) {
        message.error(`No feedback of added file`)
      }
      this.addNewFile(info.file.response.payload)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
  
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    }
    const { getFieldDecorator } = this.props.form

    return (
      <LayoutDefault>
        <Form>
          <FormItem
            {...formItemLayout}
            label="File"
          >
            <div className="dropbox">
              <Upload.Dragger 
                name="file" 
                multiple={false}
                onChange={this.fileUpload} 
                action={SERVER_URL_FILE_ADD}
                beforeUpload={this.beforeUpload}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </div>
          </FormItem>
        </Form>
      </LayoutDefault>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fileAdded: file => dispatch(fileAdded(file)),
})

export default connect(null, mapDispatchToProps)(Form.create()(FileAdd))