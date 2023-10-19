import { BuildingCode } from '@kroust/swarm-client'

export const BuildingTranslations: Record<BuildingCode, { name: string, description: string }> = {
  [BuildingCode.MUSHROOM_FARM]: {
    name: 'Ferme à champignons',
    description: 'La nourriture la plus facile à cultiver en grande quantité en ces temps sombres'
  },
  [BuildingCode.MUSHROOM_WAREHOUSE]: {
    name: 'Entrepôt de champignon',
    description: 'Il faut bien un endroit où stocker tout ces champignons sans quoi ils vont pourrir'
  },
  [BuildingCode.RECYCLING_PLANT]: {
    name: 'Centre de recyclage',
    description: 'On trouve du plastique partout et c\'est devenu la matière la plus courante. Profitons-en pour le recycler.'
  },
  [BuildingCode.PLASTIC_WAREHOUSE]: {
    name: 'Entrepôt de plastique',
    description: 'Le plastique trié et raffiné doit être séparé du reste, et stocké dans ces entrepôts.'
  },
  [BuildingCode.RESEARCH_LAB]: {
    name: 'Laboratoire de recherche',
    description: 'Toute sorte d\'expériences sont menées dans ce laboratoire pour améliorer la vie de la colonie, ou en tout cas son expansion.'
  },
  [BuildingCode.CLONING_FACTORY]: {
    name: 'Usine de clonage',
    description: 'La reproduction sexuée est trop complexe et trop longue ce qui rendrait les humains vulnérables. La solution la plus pratique reste le clonage.'
  }
}
