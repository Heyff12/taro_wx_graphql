import ApolloClient from 'apollo-boost';
import Taro from '@tarojs/taro'

export const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  fetch: async (url, options) => {
    const {headers } = options || {
      headers: {},
    }
    try {
      const token = Taro.getStorageSync('token')
      const { data, statusCode } = await Taro.request({
        url,
        method: options.method,
        data: options.body,
        header: { ...headers, authorization: token }
      })
      if ( statusCode === 401){
        // authLogin({})
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



