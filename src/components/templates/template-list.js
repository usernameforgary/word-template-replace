import React from 'react'
import { Table, Popconfirm, Tag } from 'antd'
import { connect } from 'react-redux'
import { getTemplates, setCurrentSideBar} from '../../reducers/template'
import { KEY_SUB_MENU_TEMPLATES, KEY_MENU_ITEM_TEMPLATE_LIST } from '../../consts/side-bar'

import LayoutDefault from '../layouts/layout-default'

class TemplateList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setCurrentSideBar(KEY_SUB_MENU_TEMPLATES, KEY_MENU_ITEM_TEMPLATE_LIST)
    this.props.getTemplates()
  }

  handleDeleteTag(tagId, record) {
    console.dir(record)
  }

  render() {
    const columns = [
      {
        title: 'Template Name',
        dataIndex: 'name',
        key: 'name',
        width: 150
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags, record, index) => (
          <span>
            {
              tags.map(tag => 
                <Popconfirm key={`${tag._id}_${tag.tag_key}`} title="Sure to delete?" onConfirm={() => this.handleDeleteTag(tag._id, record)}>
                  <Tag color='#87d068'>{`${tag.tag_key} ❌`}</Tag> 
                </Popconfirm>
              )
            }
          </span>
        )
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        width: 150,
        render: () => <a href="javascript:;">Delete</a>
      }
    ];
    return (
      <LayoutDefault>
         <Table
          bordered
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
  setCurrentSideBar: (subMenu, menuItem) => dispatch(setCurrentSideBar(subMenu, menuItem)),
  getTemplates: () => dispatch(getTemplates())
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)