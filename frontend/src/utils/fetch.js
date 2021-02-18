import _ from 'lodash'

const request = async (url, config) => {
  const response = await fetch(url, config)
  const rData = await response.json()

  if (![200, 201].includes(response.status)) throw new Error(rData.message)
  return [rData, response]
}

export const postData = async (url, data, config = {}) => {
  const defaultConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  return request(url, _.merge(defaultConfig, config))
}

export const putData = async (url, data, config = {}) => {
  const defaultConfig = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  return request(url, _.merge(defaultConfig, config))
}

export const getData = async (url, config = {}) => {
  const defaultConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return request(url, _.merge(defaultConfig, config))
}
