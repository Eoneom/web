import { ErrorResponse, GenericResponse } from '@kroust/swarm-client/dist/response'

export const isError = (res: GenericResponse<unknown>): res is ErrorResponse => {
  return res.status === 'nok'
}
