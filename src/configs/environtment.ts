const environment = {
  API_BASE_URL: process.env.VUE_APP_API_BASE_URL,
  API_BASE_PATH: process.env.VUE_APP_API_BASE_PATH,
  API_URL: process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_BASE_PATH,
  MEDIA_URL: process.env.VUE_APP_MEDIA_URL,
  API_KEY: process.env.VUE_APP_API_KEY
}

export default environment
