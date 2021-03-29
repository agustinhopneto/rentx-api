declare namespace Express{
  export interface Request { // eslint-disable-line
    user: {
      name: string
      id: string
    }
  }
}
