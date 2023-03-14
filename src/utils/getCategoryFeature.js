import features from '@nobia/zeus-components/lib/features'
import { prop } from '@nobia/zeus-components/lib/styled'

const getCategoryFeature = filterPage => key =>
  prop(
    `categories.${filterPage}.${key}`,
    prop(`defaults.${key}`, false)(features)
  )(features)

export default getCategoryFeature
