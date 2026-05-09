import axios from 'axios'
import { authRef, refreshTokenFunc } from '@/model/user'
import { openLoginFunc} from '@/utils/config'
import { currentLanguageRef } from './i18n'
import { useRouter } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'

const baseURL = import.meta.env.VITE_BASE_URL
const merchantID = import.meta.env.VITE_MERCHANT_ID
const lang = import.meta.env.VITE_LOCALE

axios.defaults.baseURL = baseURL
axios.defaults.timeout = 20000

axios.interceptors.request.use(
	config => {
		config.headers['x-api-key'] = authRef.value.access_token
		config.headers['Accept-Language'] = currentLanguageRef.value
		config.headers['merchant-id'] = merchantID
		return config;
	},
	error => {
		Promise.reject(error)
	}
)

let isRefreshing = false; // 标志变量，表示是否正在刷新令牌
let refreshSubscribers = []; // 队列，用于存储等待的请求

// 通知所有等待的请求
function onRefreshed(newToken) {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = []; // 清空队列
}

// 添加请求到队列
function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

axios.interceptors.response.use(
	response => {
		if (response.data.code == 200) {
			return response.data;
		} else {
			if(response.data.code == 401) {
				//临时代码 直接返回refresh 方法里面处理 错误跳转到登录
				if(response.config.url == '/v1/site/refresh') {
					return Promise.reject(response.data)
				}
				if (!isRefreshing) {
                    isRefreshing = true;
  					refreshTokenFunc()
					  .then(() => {
						onRefreshed(authRef.value.access_token); // 通知所有等待的请求
					  })
					  .catch(err => {
						  // 刷新失败，清空队列并登出
						  refreshSubscribers = []; 
						  
						  openLoginFunc(0)
						  return Promise.reject(err)
					  })
					  .finally(() => {
						  isRefreshing = false
					  })
                }else{
					// 返回一个新的 Promise，等待令牌刷新完成后再继续请求
					return new Promise((resolve, reject) => {
						addRefreshSubscriber((newToken) => {
							// 更新请求的令牌并重新发送请求
							const config = response.config;
							config.headers['x-api-key'] = newToken;
							resolve(axios(config));
						});
					});
				}
			}
			return Promise.reject(response.data)
		}
	},
	() => {
		var data = {
			code: 500,
			message: 'The server dozed off'
		}
		return Promise.reject(data)
	}
)

const _request = async (
	options = { url: '', method: '', params: [], data: [] },
	tips = { loading: false, toast: false }
) => {
	try {
		if(tips.loading) {
			showLoadingToast({
				message: 'Loading...',
				forbidClick: true,
			});
		}
		const res = await axios(options);
		if(tips.loading) {
			closeToast()
		}
		if(tips.toast) {
			showToast({
				message: res.message=='Successful'?'Sucesso':res.message,
				type: 'success',
				wordBreak: 'break-word',
			});
		}
		return res;
	} catch (err) {
		if(tips.loading) {
			closeToast()
		}
		if(tips.toast) {
			showToast({
				message: err.message,
				wordBreak: 'break-word',
			});
		}
		return err;
	}
}

const $get = (options, tips = {loading: false, toast: false}) => {
	return _request({method: 'GET', ...options}, tips)
}

const $post = (options, tips = {loading: false, toast: false}) => {
	return _request({method: 'POST', ...options}, tips)
}

const $put = (options, tips = {loading: false, toast: false}) => {
	return _request({method: 'PUT', ...options}, tips)
}

const $delete = (options, tips = {loading: false, toast: false}) => {
	return _request({method: 'DELETE', ...options}, tips)
}

export { $get, $post, $put, $delete }