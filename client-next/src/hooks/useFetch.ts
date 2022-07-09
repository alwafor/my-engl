import {useEffect, useState} from 'react'

interface IFetchPropsBase {
  url: string,
  runInitial: boolean
}

interface IUseQueryFetchProps extends IFetchPropsBase {
  method: 'GET',
  body?: undefined
}

interface IUseMutationFetchProps extends IFetchPropsBase {
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: object
}

type TRunFetch = {
  body?: object, query?: object
} | undefined

/**
 * useFetch function is used to get data from server
 * @param url - url from where we are fetching
 * @param method - HTTP method
 * @param body -  body to send on server
 * @param runInitial - if set to true, runs fetch once on start
 */

export default function useFetch<T extends unknown>({
                                                      url, method, body, runInitial
                                                    }: IUseQueryFetchProps | IUseMutationFetchProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    if (runInitial) {
      runFetch(body)
    }
  }, [])

  const runFetch = async (params: TRunFetch = {}) => {
    const {body, query} = params
    try {
      setIsLoading(true)

      let requestInit: RequestInit = {
        method,
        headers: {'Content-Type': 'application/json'}
      }

      if (body) {
        requestInit.body = JSON.stringify(body)
      }

      const queryParams = query && '?' + Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')

      const response = await fetch(`${url + (queryParams ? queryParams : '')}`, requestInit)
      const responseData = await response.json()
      setData(responseData as T)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {data, isLoading, error, run: runFetch}
}