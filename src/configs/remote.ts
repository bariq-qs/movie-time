/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/configs/api'
import { IRemote } from '@/utils/interfaces/iRemote'
import remoteEnum from '@/utils/enum/enumActions'
import environment from './environtment'

// eslint-disable-next-line no-shadow

class Remote implements IRemote {
  method: remoteEnum

  endPoint: string

  header: any

  data: any

  constructor(method: remoteEnum, endPoint: string, data: any = null, header = {}) {
    this.method = method
    this.endPoint = endPoint
    this.header = header
    this.data = data
    // this.header.timeout = 5000
  }

  get() {
    const remote = (this.header) ? api.get(this.endPoint, {
      headers: this.header,
      params: {
        api_key: environment.API_KEY
      }
    }) : api.get(this.endPoint, {
      params: {
        api_key: environment.API_KEY
      }
    })
    return remote
  }

  post() {
    const remote = api.post(this.endPoint, this.data, {
      headers: this.header
    })
    return remote
  }

  put() {
    const remote = api.put(this.endPoint, this.data, {
      headers: this.header
    })
    return remote
  }

  patch() {
    const remote = api.patch(this.endPoint, this.data, {
      headers: this.header
    })
    return remote
  }

  delete() {
    const remote = api.delete(this.endPoint, {
      headers: this.header
    })
    return remote
  }

  run() {
    switch (this.method) {
      case remoteEnum.get:
        return this.get()
      case remoteEnum.post:
        return this.post()
      case remoteEnum.patch:
        return this.patch()
      case remoteEnum.put:
        return this.put()
      case remoteEnum.delete:
        return this.delete()
      default:
        return []
    }
  }
}

export { Remote, remoteEnum }
