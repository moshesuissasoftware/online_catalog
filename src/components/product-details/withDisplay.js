import { withHandlers } from '@nobia/zeus-components/lib/recompose'
import getCategoryFeature from '../../utils/getCategoryFeature'

const withDisplay = categoryGetter =>
  withHandlers({
    display: props => key =>
      getCategoryFeature(categoryGetter(props))(`display.${key}`),
  })

export default withDisplay
