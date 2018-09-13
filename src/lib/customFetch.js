import fetch from 'cross-fetch'

const fetchPostJson = (url, postData = {}) => (
  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
)

const fetchGet = (url) => (
  fetch(url)
)

export {
  fetchPostJson,
  fetchGet
}