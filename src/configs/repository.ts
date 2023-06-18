/* eslint-disable class-methods-use-this */
import { Response } from '@/utils/helpers/response'

class Repository {
  remote: any

  savingData: any

  constructor(remote: any, savingData: any = null) {
    this.remote = remote
    if (savingData) {
      this.savingData = savingData
    }
  }

  private result = async () => {
    const data = new Response()
    // if (store.state.network.connection) {
    try {
      const fetch = await this.fetchData().run()
      const code = fetch.status
      const result = fetch.data
      if (code === 201) {
        data.result = fetch.data
        data.message = fetch.data.Detail
      } else if (code === 200) {
        // eslint-disable-next-line no-prototype-builtins
        if (Array.isArray(result.results)) {
          data.result = result.results
          data.count = result.total_results
          data.pagesize = result.total_pages
          data.pagenumber = result.page
          data.message = 'berhasil ditampilkan'
        } else {
          data.result = result
        }
      } else {
        data.error = true
        data.message = `${fetch.data.Header} ${fetch.data.Detail}`
        data.result = fetch.data.Data
      }
      data.code = fetch.status
    } catch (e: any) {
      if (typeof e.response === 'undefined') {
        data.error = true
        data.message = 'A network error occurred. This could be a CORS issue or a dropped internet connection. It is not possible for us to know.'
        data.result = ''
        // return Promise.reject(e)
        return data
      }
      if (e.response.status === 400) {
        data.error = true
        data.message = `${e.response.data.Header} ${e.response.data.Detail}`
        data.code = (e.response) ? e.request.status : 400
      } else if (e.response.status === 401) {
        data.error = true
        data.message = `${e.response.data.Header} ${e.response.data.Detail}`
        data.code = (e.response) ? e.request.status : 401
      } else if (e.response.status === 502) {
        data.error = true
        data.message = 'Cek koneksi internet anda'
        data.code = (e.response) ? e.request.status : 502
      } else {
        data.error = true
        data.message = 'Gagal mengambil data'
        data.code = (e.response) ? e.request.status : 500
      }
    }
    return data
  }

  fetchData() {
    return this.remote
  }

  getResult = async (): Promise<Response> => {
    const data = await this.result()
    return data
  }
}

export default Repository
