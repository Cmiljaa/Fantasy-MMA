import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


export const get = <T = unknown>(
  url: string,
  params: Record<string, unknown> = {}
): Promise<AxiosResponse<T>> => {
  return api.get<T>(url, {
    params,
  })
}


export const post = async <T = unknown, D = unknown>(
	url: string,
	data: D = {} as D
): Promise<AxiosResponse<T>> => {

	console.log('POST START:', url)

	try {
		const response = await api.post<T>(url, data)

		console.log('POST SUCCESS:', response)

		return response

	} catch (error) {

		console.log('POST FAILED:', error)

		throw error
	}
}


export const put = <T = unknown, D = unknown>(
  url: string,
  data: D = {} as D
): Promise<AxiosResponse<T>> => {
  return api.put<T>(url, data)
}


export const remove = <T = unknown>(
  url: string
): Promise<AxiosResponse<T>> => {
  return api.delete<T>(url)
}

api.interceptors.request.use((config) => {
	console.log('REQUEST:', {
		url: config.url,
		method: config.method,
		data: config.data,
		headers: config.headers,
	})

	return config
})


api.interceptors.response.use(
	(response) => {
		console.log('RESPONSE:', response)

		return response
	},
	(error) => {
		console.log('RESPONSE ERROR:', {
			message: error.message,
			status: error.response?.status,
			data: error.response?.data,
		})

		return Promise.reject(error)
	}
)