import ApolloClient from 'apollo-boost';
import Taro from '@tarojs/taro'
// import 'dotenv/config';
// require('dotenv').config()

export const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  request: operation => {
    const token = Taro.getStorageSync('token')
    operation.setContext({
      headers: {
        authorizationWEE: `Bearer ${token}`,
      },
    });
  },
  fetch: async (url, options) => {
    const {headers } = options || {
      headers: {},
    }
    try {
      const { data, statusCode } = await Taro.request({
        url,
        method: options.method,
        data: options.body,
        header: { ...headers, authorization: 'token' }
      })
      // 在此处添加了header，request的header才有效
      const {errors} = data
      const clientStasusCode = errors ? errors[0].message.statusCode : statusCode
      if ( clientStasusCode === 401){
        Taro.removeStorage({
          key: 'token',
          success: function () {
            authLogin({})
          }
        })
      }
      return {
        ok: () => {
          return statusCode >= 200 && statusCode < 300
        },
        text: () => {
          return Promise.resolve(JSON.stringify(data))
        }
      }
    } catch (error) {
      throw error
    }
  }
});



