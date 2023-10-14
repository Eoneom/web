import { BuildingCode } from '@kroust/swarm-client'

export const BuildingTranslations: Record<BuildingCode, { name: string }> = {
  [BuildingCode.MUSHROOM_FARM]: { name: 'Ferme à champignons' },
  [BuildingCode.MUSHROOM_WAREHOUSE]: { name: 'Entrepôt de champignon' },
  [BuildingCode.RECYCLING_PLANT]: { name: 'Centre de recyclage' },
  [BuildingCode.PLASTIC_WAREHOUSE]: { name: 'Entrepôt de plastique' },
  [BuildingCode.RESEARCH_LAB]: { name: 'Laboratoire de recherche' },
  [BuildingCode.UNIVERSITY]: { name: 'Université' }
}
