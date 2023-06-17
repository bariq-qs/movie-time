import { Response } from '@/utils/helpers/response'
import {
  Remote,
  remoteEnum
} from '@/configs/remote'
import Repository from '@/configs/repository'
import returnUrlPrams from '@/utils/helpers/returnUrlPrams'

const prefixEndpoint = '/movie'

class MovieUseCase {
  getPopular(): Promise<Response> {
    return new Repository((new Remote(remoteEnum.get, `${prefixEndpoint}/popular`))).getResult()
  }

  getDiscover(filters: any): Promise<Response> {
    const params = returnUrlPrams(filters)
    return new Repository((new Remote(remoteEnum.get, `/discover${prefixEndpoint}${params}`))).getResult()
  }
}

const movieUseCase = new MovieUseCase()

export {
  movieUseCase
}