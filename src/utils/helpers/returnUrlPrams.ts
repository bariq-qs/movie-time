interface IFilterPrams {
  custom?: string[][] | any
}

export default (filter: IFilterPrams = {
  custom: []
}): string => {
  const arrParams: string[] = []
  let paramsString = ''
  if (filter?.custom?.length > 0) {
    filter.custom.forEach((fil: string[]) => {
      if (fil.length > 0) {
        arrParams.push(`${fil[0]}${fil[1]}${fil[2]}`)
      }
    })
  }
  if (arrParams.length > 0) {
    paramsString = `?${arrParams.join('&')}`
  }

  return paramsString
}
