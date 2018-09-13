import { Layout, Menu, Icon } from 'antd'
import React from 'react'
import bindAll from 'lodash/bindAll'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { sideCollapse, menuSwitch, menuItemClick } from '../../reducers/side-bar'
import {
  KEY_MENU_ITEM_EXPORT,
  KEY_SUB_MENU_FILES,
  KEY_MENU_ITEM_FILE_LIST,
  KEY_MENU_ITEM_FILE_UPLOAD,
  KEY_SUB_MENU_TEMPLATES,
  KEY_MENU_ITEM_TEMPLATE_LIST,
  KEY_MENU_ITEM_TEMPLATE_ADD,
  KEY_SUB_MENU_TAGS,
  KEY_MENU_ITEM_TAG_LIST,
  KEY_MENU_ITEM_TAG_ADD,
  ROUTER_URL_EXPORT,
  ROUTER_URL_FILE_LIST,
  ROUTER_URL_FILE_ADD,
  ROUTER_URL_TEMPLATE_LIST,
  ROUTER_URL_TEMPLATE_ADD,
} from '../../consts/side-bar'

const { Header, Sider, Content} = Layout
const SubMenu = Menu.SubMenu;

class LayoutDefault extends React.Component {
  constructor(props) {
    super(props)
    this.onCollapse = this.onCollapse.bind(this)
  }

  onCollapse() {
    this.props.onCollapse(!this.props.sideBar.collapsed)
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: 0 }}>
          <Icon
            className="trigger"
            type={this.props.sideBar.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.onCollapse}
          />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.props.sideBar.collapsed}
            onCollapse={this.onCollapse}
            style={{ background: '#fff' }}
          >
            <Menu theme="light"
              defaultOpenKeys={[this.props.sideBar.subMenuKey]}
              defaultSelectedKeys={[this.props.sideBar.menuItemKey]} mode="inline">
              <Menu.Item 
                key={KEY_MENU_ITEM_EXPORT} 
                onClick={({item, key, keyPath})=> {
                  this.props.menuItemClick('', key)
                }}
              >
                <Icon type="export" />
                <span>Export File</span>
              </Menu.Item>
              <SubMenu
                key={KEY_SUB_MENU_FILES}
                title={<span><Icon type="file-word" /><span>Word Files</span></span>}
              >
                <Menu.Item 
                  key={KEY_MENU_ITEM_FILE_LIST}
                  onClick={({item, key, keyPath})=> {
                    this.props.menuItemClick(KEY_SUB_MENU_FILES, key)
                  }}
                >
                  <Icon type="table" />
                  <span>File List</span>
                </Menu.Item>
                <Menu.Item 
                  key={KEY_MENU_ITEM_FILE_UPLOAD}
                  onClick={({item, key, keyPath})=> {
                    this.props.menuItemClick(KEY_SUB_MENU_FILES, key)
                  }}
                >
                  <Icon type="upload" />
                  <span>Add File</span>
                </Menu.Item> 
              </SubMenu>
              <SubMenu
                key={KEY_SUB_MENU_TEMPLATES}
                title={<span><Icon type="file" /><span>Templates</span></span>}
              >
                <Menu.Item 
                  key={KEY_MENU_ITEM_TEMPLATE_LIST}
                  onClick={({item, key, keyPath})=> {
                    this.props.menuItemClick(KEY_SUB_MENU_TEMPLATES, key)
                  }}
                >
                  <Icon type="table"/>
                  <span>Template List</span>
                </Menu.Item>
                <Menu.Item 
                  key={KEY_MENU_ITEM_TEMPLATE_ADD}
                  onClick={({item, key, keyPath})=> {
                    this.props.menuItemClick(KEY_SUB_MENU_TEMPLATES, key)
                  }}
                >
                  <Icon type="file-add"/>
                  <span>Add Template</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key={KEY_SUB_MENU_TAGS}
                title={<span><Icon type="tags" /><span>Tags</span></span>}
              >
                <Menu.Item 
                  key={KEY_MENU_ITEM_TAG_LIST}
                  onClick={({item, key, keyPath})=> {
                    this.props.menuItemClick(KEY_SUB_MENU_TAGS, key)
                  }}
                >
                  <Icon type="table"/>
                  <span>Tag List</span>
                </Menu.Item>
                <Menu.Item 
                  key={KEY_MENU_ITEM_TAG_ADD}
                  onClick={({item, key, keyPath})=> {
                    this.props.menuItemClick(KEY_SUB_MENU_TAGS, key)
                  }}
                >
                  <Icon type="tag"/>
                  <span>Add Tag</span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', height: '100vh'}}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

LayoutDefault.propTypes = {
  sideBar: PropTypes.shape({
    subMenuKey: PropTypes.string,
    menuItemKey: PropTypes.string,
    collapsed: PropTypes.bool
  })
}

const mapStateToProps = state => ({
  sideBar: state.sideBar
})
const mapDispatchToProps = dispatch => ({
  onCollapse: collapsed => dispatch(sideCollapse(collapsed)),
  menuItemClick: (subMenuKey, menuItemKey) => dispatch(menuItemClick(subMenuKey, menuItemKey))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutDefault)