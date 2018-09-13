import {
  KEY_MENU_ITEM_EXPORT,
  KEY_SUB_MENU_FILES,
  KEY_MENU_ITEM_FILE_LIST,
  KEY_MENU_ITEM_FILE_UPLOAD,
  KEY_SUB_MENU_TEMPLATES,
  KEY_MENU_ITEM_TEMPLATE_LIST,
  KEY_MENU_ITEM_TEMPLATE_ADD,
  KEY_MENU_ITEM_TAG_LIST,
  KEY_MENU_ITEM_TAG_ADD,
  ROUTER_URL_EXPORT,
  ROUTER_URL_FILE_LIST,
  ROUTER_URL_FILE_ADD,
  ROUTER_URL_TEMPLATE_LIST,
  ROUTER_URL_TEMPLATE_ADD,
  ROUTER_URL_TAG_LIST,
  ROUTER_URL_TAG_ADD,
} from '../consts/side-bar'

import { push } from 'connected-react-router'

const SIDE_COLLAPSE = 'SIDE_COLLAPSE'
const MENU_SWITCHED = 'MENU_SWITCHED'

const initialState = {
  subMenuKey: '',
  menuItemKey: KEY_MENU_ITEM_EXPORT,
  collapsed: false
}

const reducer = (state, action) => {
  if(typeof state === 'undefined') state = initialState
  switch(action.type) {
    case MENU_SWITCHED:
      return Object.assign({}, state, {
        subMenuKey: action.subMenuKey,
        menuItemKey: action.menuItemKey 
      }) 
    case SIDE_COLLAPSE:
      return Object.assign({}, state, {
        collapsed: action.collapsed
      })
    default:
      return state
  }
}

const sideCollapse = (collapsed) => ({
  type: SIDE_COLLAPSE,
  collapsed: collapsed
})

const menuSwitch = (subMenuKey, menuItemKey) => (
  {
    type: MENU_SWITCHED,
    subMenuKey: subMenuKey,
    menuItemKey: menuItemKey 
  }
)

const menuItemClick = (subMenuKey, menuItemKey) => (dispatch) => {
  dispatch(menuSwitch(subMenuKey, menuItemKey))
  let pushRouteURL = '/'
  switch(menuItemKey) {
    case KEY_MENU_ITEM_FILE_LIST:
      pushRouteURL = ROUTER_URL_FILE_LIST
      break
    case KEY_MENU_ITEM_FILE_UPLOAD:
      pushRouteURL = ROUTER_URL_FILE_ADD
      break
    case KEY_MENU_ITEM_TEMPLATE_ADD:
      pushRouteURL = ROUTER_URL_TEMPLATE_ADD
      break
    case KEY_MENU_ITEM_TEMPLATE_LIST:
      pushRouteURL = ROUTER_URL_TEMPLATE_LIST
      break
    case KEY_MENU_ITEM_TAG_ADD:
      pushRouteURL = ROUTER_URL_TAG_ADD
      break
    case KEY_MENU_ITEM_TAG_LIST:
      pushRouteURL = ROUTER_URL_TAG_LIST
      break
    default:
      break
  }

  dispatch(push(pushRouteURL))
}

export {
  reducer as default,
  initialState as menuBarInitialState,
  sideCollapse,
  menuSwitch,
  menuItemClick
}