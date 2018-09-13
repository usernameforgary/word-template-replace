import React from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { getTemplates } from '../../reducers/template'

import LayoutDefault from '../layouts/layout-default'

class TemplateList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getTemplates()
  }

  render() {
    const columns = [
      {
        title: 'Template Name',
        dataIndex: 'name',
        key: 'name'
      },
      { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> }
    ];
    return (
      <LayoutDefault>
         <Table
          columns={columns}
          dataSource={this.props.templates.templates}
          pagination={{defaultPageSize: 7}}
        />
      </LayoutDefault>
    )
  }
}

const mapStateToProps = state => ({
  templates: state.templates
})
const mapDispatchToProps = dispatch => ({
  getTemplates: () => dispatch(getTemplates())
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)