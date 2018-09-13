import fetch from 'cross-fetch'
import {
  SERVER_URL_FILE_LIST_ALL,
  SERVER_URL_FILE_FIND_BY_NAME,
  SERVER_URL_FILE_DELETE,
} from '../consts/urls'

import { fetchPostJson } from '../lib/customFetch'

const FILE_ADDED = 'FILE_ADDED'
const LIST_FILES = 'LIST_FILES'
const DELETE_FILE = 'DELETE_FILE'

const initialState = {
  files: []
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialState
  switch(action.type) {
    case FILE_ADDED:
      return {
        ...state,
        files: [...state.files, action.file] 
      }
    case DELETE_FILE:
      return {
        files: state.files.filter(file => file._id !== action.fileId)
      }
    case LIST_FILES:
      return {
        files: action.files
      }
    default:
      return state
  }
}

const fileAdded = (file) => ({
  type: FILE_ADDED,
  file: file
})
const listFiles = (files) => {
  return {
    type: LIST_FILES,
    files: files
  }
}
const deleteFile = (fileId) => ({
  type: DELETE_FILE,
  fileId
})

const getFileList = () => {
  return dispatch => {
    return fetch(SERVER_URL_FILE_LIST_ALL)
      .then(res => res.json())
      .then(json => {
        if(!json.success) {
          console.error('get file list failed', json)
        } else {
          let files = json.payload.files
          files = files.map(file => Object.assign({}, file, {key: file._id}))
          dispatch(listFiles(files))          
        }
      }).catch(e => {
        console.error('error in get file list: ', e.message)
        console.error(e)
      })
  }
}

const deleteSelectedFile = (id) => {
  return dispatch => {
    return fetchPostJson(SERVER_URL_FILE_DELETE, {id: id})
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          dispatch(deleteFile(id))
        } else {
          console.error(`update file failed: ${json}`)
        }
      })
      .catch(e => {
        console.error(`update catch error: ${e.message || e}`)
      })
  }
}

export {
  reducer as default,
  initialState as fileInitialState,
  fileAdded,
  getFileList,
  deleteSelectedFile,
}