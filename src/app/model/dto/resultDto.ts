export interface Result {
  x: number,
  y: number,
  r: number,
  curDate: number,
  scriptTime: number,
  hit: boolean
}

export interface CheckForm {
  x: boolean[],
  y: string,
  r: boolean[]
}

export interface CheckRequest {
  x: string,
  y: string,
  r: string
}

export interface HistoryResponse {
  results: Result[]
}

export interface CheckResponse {
  checkedResult: Result
}
