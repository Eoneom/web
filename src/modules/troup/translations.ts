import { TroupCode } from '@kroust/swarm-client'

interface TroupTranslation {
  name: string
  description: string
  effect: string
}

export const TroupTranslations: Record<TroupCode, TroupTranslation> = {
  [TroupCode.EXPLORER]: {
    name: 'Explorateur',
    description: 'Créé pour se déplacer rapidement, il est capable de se camoufler et passer n\'importe où',
    effect: 'Récupère des informations sur le monde concernant les ressources à récupérer'
  }
}
