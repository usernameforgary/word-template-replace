import React from 'react'
import { connect } from 'react-redux'

import { Table } from 'antd'
import { getAllTags } from '../../reducers/tag'
import LayoutDefault from '../layouts/layout-default'

class TagList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllTags()
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
      { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> }
    ];
    return (
      <LayoutDefault>
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
  tags: state.tags
})

const mapDispatchToProps = dispatch => ({
  getAllTags: () => dispatch(getAllTags())
})

export default connect(mapStateToProps, mapDispatchToProps)(TagList)