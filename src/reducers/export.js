import { fetchPostJson } from '../lib/customFetch'
import {getFileList} from './file'
import {getTemplates} from './template'
import { SERVER_URL_EXPORT } from '../consts/urls'


const EXPORT_START = 'EXPORT_START'
const EXPORT_SUCCESS = 'EXPORT_SUCCESS'
const EXPORT_FAIL = 'EXPORT_FAIL'
const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE'

const initialState = {
  exportInProcess: false,
  exportErrorMsg: ''
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialState
  switch(action.type) {
    case EXPORT_START:
      return state
    case UPDATE_ERROR_MESSAGE:
      return Object.assign({}, {...state}, {
        exportErrorMsg: action.msg
      })
    default:
      return state
  }
}

const updateErrorMsg = (msg) => ({
  type: UPDATE_ERROR_MESSAGE,
  msg
})

const closeErrorMsg = () => {
  return dispatch => {
    dispatch(updateErrorMsg(''))
  }
}

const updateFilesTemplate = () => {
  return dispatch => {
    dispatch(getFileList())
      .then(() => {
        dispatch(getTemplates())
      })
  }
}

const exportFile = (fileName, templateName) => {
  return dispatch => {
    return fetchPostJson(SERVER_URL_EXPORT, {fileName: fileName, templateName: templateName})
      .then(res => {
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);
        const url = window.URL.createObjectURL(res._bodyBlob);
        saveLink.href = url;
        saveLink.download = fileName;
        saveLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(saveLink);
      })
      .catch(e => {
        dispatch(updateErrorMsg(e.message || e))
      })
  }
}

export {
  reducer as default,
  initialState as exportInitialState,
  updateFilesTemplate,
  closeErrorMsg,
  exportFile,
}