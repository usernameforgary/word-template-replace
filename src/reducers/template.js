import {getAllTags} from './tag'
import {SERVER_URL_TEMPLATE_ADD, SERVER_URL_TEMPLATE_LIST_ALL} from '../consts/urls'
import { fetchPostJson, fetchGet } from '../lib/customFetch'

const ADD_TEMPLATE = 'ADD_TEMPLATE'
const LIST_TEMPLATE = 'LIST_TEMPLATE'
const GET_ADD_SOURCE_TAGS = 'GET_ADD_SOURCE_TAGS'
const ADD_SELECTED_TAGS = 'ADD_SELECTED_TAGS'
const REMOVE_SELECTED_TAGS = 'REMOVE_SELECTED_TAGS'
const UPDATE_ADD_ERROR_MSG = 'UPDATE_ADD_ERROR_MSG'

const initialState = {
  templates: [],
  addTemplate: {
    addErrorMsg: '',
    sourceTags: [],
    selectedTags: []
  }
}

const reducer = (state, action) => {
  if(typeof state === 'undefined') state = initialState
  switch(action.type) {
    case ADD_TEMPLATE:
      return state
    case LIST_TEMPLATE:
      return Object.assign({}, {...state}, {
        templates: action.templates
      })
    case GET_ADD_SOURCE_TAGS:
      return Object.assign({}, {...state}, {
        addTemplate: Object.assign({}, {...state.addTemplate}, {
          sourceTags: action.tags,
          selectedTags: [] 
        })
      })
    case ADD_SELECTED_TAGS:
      return Object.assign({}, {...state}, {
        addTemplate: Object.assign({}, {...state.addTemplate}, {
          selectedTags: [...action.tagKeys, ...state.addTemplate.selectedTags]
        })
      })
    case REMOVE_SELECTED_TAGS:
      return Object.assign({}, {...state}, {
        addTemplate: Object.assign({}, {...state.addTemplate}, {
          selectedTags: state.addTemplate.selectedTags.filter(tag => action.tagKeys.indexOf(tag) > -1)
        })
      })
    case UPDATE_ADD_ERROR_MSG:
      return Object.assign({}, {...state}, {
        addTemplate: Object.assign({}, {...state.addTemplate}, {
          addErrorMsg: action.msg
        })
      })
    default:
      return state
  }
}

const getSourceTag = (tags) => ({
  type: GET_ADD_SOURCE_TAGS,
  tags: tags
})
const addSelectedTags = (tagKeys) => ({
  type: ADD_SELECTED_TAGS,
  tagKeys
})
const removeSelectedTags = (tagKeys) => ({
  type: REMOVE_SELECTED_TAGS,
  tagKeys
})
const addTemplate = (template) => ({
  type: ADD_TEMPLATE,
  template
})
const listTemplate = (templates) => ({
  type: LIST_TEMPLATE,
  templates
})
const updateErrorMessage = (msg) => ({
  type: UPDATE_ADD_ERROR_MSG,
  msg
})


const updateAlertMessage = (msg) => {
  return dispatch => {
    dispatch(updateErrorMessage(msg))
  }
}

const getTransferSourceTags = () => {
  return (dispatch, getState) => {
    dispatch(getAllTags()).then(() => {
      const tags = getState().tags.tags
      const sourceTags = tags.map(tag => Object.assign({}, {
        key: tag.key,
        title: `${tag.tag_key} => ${tag.tag_value}`,
        chosen: false
      }))
      dispatch(getSourceTag(sourceTags))
    })
  }
}

const updateSelectedTag = (targetKeys, direction) => {
  return dispatch => {
    if(direction.toLowerCase() === 'right') {
      dispatch(addSelectedTags(targetKeys))
    } else {
      dispatch(removeSelectedTags(targetKeys))
    }
  }
}

const saveTemplate = (templateData) => {
  return dispatch => {
    return fetchPostJson(SERVER_URL_TEMPLATE_ADD, templateData)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          //TODO
          console.dir(json.payload)
        } else {
          dispatch(updateErrorMessage(json.error || json))
        }
      })
      .catch(e => {
        console.error(`template save catch error: ${e.message || e}`)
      })
  }
}

const getTemplates = () => {
  return dispatch => {
    return fetchGet(SERVER_URL_TEMPLATE_LIST_ALL)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          let templates = json.payload
          templates = templates.map(template => Object.assign({}, {...template}, {key: template._id}))
          dispatch(listTemplate(templates))
        } else {
          dispatch(updateErrorMessage(json.message || json))
        }
      })
      .catch(e => {
          console.error(`fetch template list catch error: ${e.message || e}`)
      })
  }
}

export {
  reducer as default,
  initialState as templateInitialState,
  getTransferSourceTags,
  updateSelectedTag,
  saveTemplate,
  getTemplates,
  updateAlertMessage,
}