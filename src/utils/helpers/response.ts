/* eslint-disable no-underscore-dangle, import/prefer-default-export */
import IResponse from '../interfaces/iResponse'

class Response implements IResponse {
  private _error: boolean

  private _message: string

  private _code: number

  private _result: any

  private _count: number

  private _pagenumber: number

  private _pagesize: number

  constructor() {
    this._error = false
    this._message = 'ok'
    this._code = 200
    this._result = []
    this._count = 0
    this._pagenumber = 0
    this._pagesize = 0
  }

  set error(err: boolean) {
    this._error = err
  }

  get error() : boolean {
    return this._error
  }

  set message(msg: string) {
    this._message = msg
  }

  get message() : string {
    return this._message
  }

  set code(code: number) {
    this._code = code
  }

  get code() : number {
    return this._code
  }

  set result(result: any) {
    this._result = result
  }

  get result() : any {
    return this._result
  }

  set count(count: number) {
    this._count = count
  }

  get count() : number {
    return this._count
  }

  set pagenumber(pagenumber: number) {
    this._pagenumber = pagenumber
  }

  get pagenumber() : number {
    return this._pagenumber
  }

  set pagesize(pagesize: number) {
    this._pagesize = pagesize
  }

  get pagesize() : number {
    return this._pagesize
  }
}

export {
  Response
}
