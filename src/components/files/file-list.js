import React from 'react'
import { Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { getFileList, deleteSelectedFile } from '../../reducers/file'

import LayoutDefault from '../layouts/layout-default'

class FileList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getFileList()
  }

  handleDelete(key) {
    this.props.deleteSelectedFile(key)
  }

  render() {
    const columns = [
      {
        title: 'File Name',
        dataIndex: 'file_name',
        width: '50%',
        key: 'file_name'
      }, { 
        title: 'Action',
        dataIndex: '',
        key: '_id', 
        render: (text, record) => { 
          return (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          )
        }
      }
    ];

    return (
      <LayoutDefault>
        <Table
          columns={columns}
          dataSource={this.props.files.files}
          pagination={{defaultPageSize: 7}}
        />
      </LayoutDefault>
    )
  }
}
const mapStateToProps = state => ({
  files: state.files
})

const mapDispatchToProps = dispatch => ({
  getFileList: () => dispatch(getFileList()),
  deleteSelectedFile: id => dispatch(deleteSelectedFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList) 