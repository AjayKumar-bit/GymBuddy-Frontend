import axios, { AxiosResponse } from 'axios'

import { log } from '@config'
import { API_TIMEOUT, ApiStatusCode, IApiResponse, RequestType } from '@constants'
import { IApiConfig } from '@types'

const axiosConfig = <Params = undefined>({
  params,
  apiData,
}: {
  params?: Params
  apiData: IApiConfig
}) => ({
  baseURL: apiData.baseUrl,
  timeout: API_TIMEOUT,
  params,
  headers: apiData.headers,
})

const mapAxiosResponseToLocalResponseType = <RequestData, ResponseData>(
  axiosResponse: AxiosResponse<ResponseData, RequestData>,
): IApiResponse<ResponseData> => ({
  data: axiosResponse.data,
  message: axiosResponse.statusText,
  status: axiosResponse.status,
})

const errorResponse = <T>(
  errorCode: number | string,
  errorMessage: string,
  data?: T,
  type = '',
) => ({
  code: errorCode,
  data,
  message: errorMessage,
  type,
})

const getApiResponseUsingRequestVerb = async <RequestData, ResponseData, Params = undefined>({
  endpoint,
  request,
  requestData,
  apiData,
}: {
  endpoint: string
  request: RequestType
  requestData?: RequestData
  apiData: IApiConfig
}): Promise<AxiosResponse<ResponseData, RequestData> | null> => {
  const config = axiosConfig<Params>({
    apiData,
  })

  switch (request) {
    case RequestType.GET:
      return axios.get(endpoint, config)
    case RequestType.POST:
      return axios.post(endpoint, requestData, config)
    case RequestType.PUT:
      return axios.put(endpoint, requestData, config)
    case RequestType.PATCH:
      return axios.patch(endpoint, requestData, config)
    // TODO : will update this later
    // case RequestType.DELETE:
    //   return axios.delete(endpoint, { ...config, data })
    default: {
      return Promise.resolve(null)
    }
  }
}

export const makeApiCall = async <RequestData, ResponseData, Params = undefined>({
  endpoint,
  request,
  requestData,
  apiData,
}: {
  endpoint: string
  request: RequestType
  requestData?: RequestData
  apiData: IApiConfig
}): Promise<IApiResponse<ResponseData>> => {
  try {
    const response = await getApiResponseUsingRequestVerb<RequestData, ResponseData, Params>({
      endpoint,
      request,
      requestData,
      apiData,
    })

    log.info('API Response', {
      baseUrl: apiData.baseUrl,
      endpoint,
      payload: requestData,
      response: response?.data,
    })

    if (response?.status) {
      return mapAxiosResponseToLocalResponseType<RequestData, ResponseData>(response)
    }

    return errorResponse(500, 'Could not get a response from API')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (exception: any) {
    log.error(
      `API Error: ${apiData.baseUrl}${endpoint}`,
      `\n${exception}`,
      '\nresponse:',
      exception?.response?.data,
    )
    if (exception?.response?.status) {
      return errorResponse(
        exception?.response?.status,
        exception?.response?.data?.responseException?.exceptionMessage,
        exception?.response?.data,
        request.toLowerCase(),
      )
    }

    return errorResponse(
      ApiStatusCode.NetworkError,
      exception,
      exception?.response?.data,
      request.toLowerCase(),
    )
  }
}
