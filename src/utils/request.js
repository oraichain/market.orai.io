
import { extend } from 'umi-request';
import { notification } from 'antd';
const codeMessage = {
  200: '',
  201: '',
  202: '',
  204: '',
  400: '',
  401: '',
  403: '',
  404: '',
  406: '',
  410: '',
  422: '',
  500: '',
  502: '',
  503: '',
  504: '',
};

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: ` ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '',
      message: '',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
export default request;
