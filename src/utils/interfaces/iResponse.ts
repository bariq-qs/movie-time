interface IResponse {
  code: number,
  count?: number,
  error: boolean,
  message: string,
  result: any,
  pagesize?: number | undefined,
  pagenumber?: number | undefined,
}

export default IResponse
