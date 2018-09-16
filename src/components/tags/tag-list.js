import React from 'react'
import { connect } from 'react-redux'

import { Table, Popconfirm, Alert} from 'antd'
import { getAllTags, handleDeleteTag, handleUpdateAlertMessage } from '../../reducers/tag'
import LayoutDefault from '../layouts/layout-default'

class TagList extends React.Component {
  constructor(props) {
    super(props)
    this.handleCloseAlert = this.handleCloseAlert.bind(this)
  }

  componentDidMount() {
    this.props.getAllTags()
  }

  handleDeleteTag(text, record) {
    this.props.handleDeleteTag(record._id)
  }

  handleCloseAlert() {
    this.props.handleUpdateAlertMessage('')
  }

  render() {
    const columns = [
      {
        title: 'Tag Key',
        dataIndex: 'tag_key',
        key: 'tag_key'
      },
      {
        title: 'Tag Value',
        dataIndex: 'tag_value',
        key: 'tag_value'
      },
      {
        title: 'Action',
        dataIndex: '',
        key: '_id',
        render: (text, record) => ( 
          <Popconfirm 
            title="Sure to delete?"
            onConfirm={() => this.handleDeleteTag(text, record)}>
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        )
      }
    ];
    return (
      <LayoutDefault>
        {
          (this.props.message) ? (
            <Alert
              message= {this.props.message}
              type= {this.props.messageType}
              closable
              afterClose={this.handleCloseAlert}
            />
          ) : null
        }
        <Table
          columns={columns}
          dataSource={this.props.tags.tags}
          pagination={{defaultPageSize: 7}}
        />
      </LayoutDefault>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags,
  message: state.tags.message,
  messageType: state.tags.messageType,
})

const mapDispatchToProps = dispatch => ({
  getAllTags: () => dispatch(getAllTags()),
  handleDeleteTag: (tagId) => dispatch(handleDeleteTag(tagId)),
  handleUpdateAlertMessage: (message, messageType) => dispatch(handleUpdateAlertMessage(message, messageType))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagList)