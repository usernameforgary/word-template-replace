import {fetchPostJson, fetchGet} from '../lib/customFetch'
import {
  SERVER_URL_TAG_ADD,
  SERVER_URL_TAG_LIST_ALL,
  SERVER_URL_TAG_DELETE,
} from '../consts/urls'

const ADD_TAG = 'ADD_TAG'
const LIST_TAGS = 'LIST_TAGS'
const DELETE_TAG = 'DELETE_TAG'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

const initialState = {
  tags: [],
  message: '',
  messageType: 'error',
}

const reducer = (state, action) => {
  if(typeof state === 'undefined') state = initialState
  switch(action.type) {
    case ADD_TAG:
      return {
        ...state,
        tags: state.tags.concat(action.tag)
      }
    case LIST_TAGS:
      return {
        ...state,
        tags: action.tags
      }
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag._id !== action.tagId)
      }
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      }
    default:
      return state
  }
}

const addTag = (tag) => ({
  type: ADD_TAG,
  tag: tag
})
const tagList = (tags) => ({
  type: LIST_TAGS,
  tags: tags
})
const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  tagId
})
const updateMessage = (message, messageType = 'error') => ({
  type: UPDATE_MESSAGE,
  message,
  messageType
})

const tagFormSubmit = (formData) => (dispatch) => {
  return fetchPostJson(SERVER_URL_TAG_ADD, formData)
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        dispatch(addTag(json.payload))
      } else {
        console.error(`server error: ${json.message || json}`)
      }
    })
    .catch(e => {
      console.error(`fetch error: ${e.message || e}`)
    })
}

const getAllTags = () => (dispatch) => {
  return fetchGet(SERVER_URL_TAG_LIST_ALL)
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        let tags = json.payload
        tags = tags.map(tag => ({...tag, key: tag._id}))
        dispatch(tagList(tags))
      } else {
        dispatch(updateMessage(`fetch tags server error: ${json.message || json}`, 'error'))
      }
    })
    .catch(e => {
      dispatch(updateMessage(`fetch tags error: ${e.message || e}`, 'error'))
    })
}

const handleDeleteTag = (tagId) => {
  return dispatch => {
    return fetchPostJson(SERVER_URL_TAG_DELETE, {
      tagId: tagId
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        dispatch(updateMessage(`Tag deleted successfully`, 'success'))
        dispatch(deleteTag(tagId))
      } else {
        dispatch(updateMessage(`Delete tag failed, server error: ${json.message || json}`, 'error'))
      }
    })
    .catch(e => {
      dispatch(updateMessage(`Delete tag failed, fetch catch error: ${e.message || e}`, 'error'))
    })
  }
}

const handleUpdateAlertMessage = (message = '', messageType = 'error') => {
  return dispatch => {
    dispatch(updateMessage(message, messageType))
  }
}

export {
  reducer as default,
  initialState as tagInitialState,
  tagFormSubmit,
  getAllTags,
  handleDeleteTag,
  handleUpdateAlertMessage,
}