import {fetchPostJson, fetchGet} from '../lib/customFetch'
import { SERVER_URL_TAG_ADD, SERVER_URL_TAG_LIST_ALL } from '../consts/urls'

const ADD_TAG = 'ADD_TAG'
const LIST_TAGS = 'LIST_TAGS'

const initialState = {
  tags: []
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
        console.error(`fetch tags server error: ${json.message || json}`)
      }
    })
    .catch(e => {
      console.error(`fetch tags error: ${e.message || e}`)
    })
}

export {
  reducer as default,
  initialState as tagInitialState,
  tagFormSubmit,
  getAllTags,
}