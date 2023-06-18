import { Response } from '@/utils/helpers/response'
import {
  Remote,
  remoteEnum
} from '@/configs/remote'
import Repository from '@/configs/repository'
import returnUrlPrams from '@/utils/helpers/returnUrlPrams'

const prefixEndpoint = '/genre'

class GenreUseCase {
  getGenre(): Promise<Response> {
    return new Repository((new Remote(remoteEnum.get, `${prefixEndpoint}/movie/list`))).getResult()
  }
}

const genreUseCase = new GenreUseCase()

export {
  genreUseCase
}
