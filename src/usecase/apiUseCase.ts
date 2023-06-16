/* eslint-disable */
import { Response } from '@/utils/helpers/response'
import {
  Remote,
  remoteEnum
} from '@/configs/remote'
import Repository from '@/configs/repository'

class ApiUseCase {
  get(path: any, params: any = ''): Promise<Response> {
    return new Repository(new Remote(remoteEnum.get, `${path}${params}`)).getResult()
  }

  postOrPut(path: any, id: any, data: any, param: any = ''): Promise<Response> {
    if (id) {
      return new Repository(new Remote(remoteEnum.put, `${path}/${id}${param}`, data)).getResult()
    } return new Repository(new Remote(remoteEnum.post, `${path}`, data)).getResult()
  }

  patch(path: any, id: any, data: any): Promise<Response> {
    return new Repository(new Remote(remoteEnum.patch, `${path}/${id}`, data)).getResult()
  }

  delete(path: any, id: any, param: any = ''): Promise<any> {
    return new Repository(new Remote(remoteEnum.delete, `${path}/${id}${param}`)).getResult()
  }

  getUser(path: any, data: any): Promise<Response> {
    return new Repository(new Remote(remoteEnum.post, `${path}`, data)).getResult()
  }
}

const apiUseCase = new ApiUseCase()

export default apiUseCase
