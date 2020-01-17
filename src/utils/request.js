/* eslint-disable */
import axios from 'axios'


const rightCodeNum = 20000;
// const parseUrl = (url, params = {}) => {
//   const strParams = Object.keys(params).reduce((result, key) => {
//     result += `${key}=${params[key]}&` // eslint-disable-line
//     return result
//   }, '')
//   return strParams ?
//     `${url}?${strParams.substr(0, strParams.length - 1)}` :
//     `${url}`
// }

axios.interceptors.response.use(
  // 加载动画, 处理权限
  // console.log('api处理权限');
  config => config,
  error => console.error(error),
)

// axios.interceptors.response.use(
//   response => response,
//   error => Promise.resolve(error.response),
// )
const checkStatus = (response) => {
  // 加载完成
  // console.log('api加载完成')
  if (response && (response.status === 200 || response.status === 304)) {
    return response
  }
  return Promise.reject(response)
}

const checkCode = (response) => {
  if (response.data.code && response.data.code !== rightCodeNum) {
    console.error('code错误url', response ? response.request.responseURL : 'response')
  }
  return response.data
}

export const apiCodes = rightCodeNum;
export const request = (url, params) => {
  return axios({
    method: 'get',
    url,
    params,
    timeout: 50000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).then(checkStatus).then(checkCode)
}

// export const post = (url, params, postData) =>
//   // new Promise((resolve, reject) => {
//   //   axios.post(parseUrl(url, params), postData)
//   //     .then((resp) => {
//   //       const { data } = resp
//   //       resolve(data)
//   //     })
//   //     .catch((err) => {
//   //       reject(err.data)
//   //     })
//   })
