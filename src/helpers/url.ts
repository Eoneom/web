import { City, Outpost } from '#types'

export const getUrlPrefix = ({ city, outpost }: { city?: City | null, outpost?: Outpost | null}): string => {
  return city ? `/city/${city.id}`: outpost ? `outpost/${outpost.id}`: ''
}
