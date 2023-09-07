import { BuildingCode } from '@kroust/swarm-client'

export const BuildingTranslations: Record<BuildingCode, { name: string }> = {
  [BuildingCode.MUSHROOM_FARM]: { name: 'Ferme à champignons' },
  [BuildingCode.RECYCLING_PLANT]: { name: 'Centre de recyclage' },
  [BuildingCode.RESEARCH_LAB]: { name: 'Laboratoire de recherche' },
  [BuildingCode.UNIVERSITY]: { name: 'Université' }
}
