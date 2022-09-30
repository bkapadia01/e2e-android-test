import { Actions } from '../../../helpers/web/actions'
import { Selectors } from '../../../helpers/web/selectors'
import { CWAPage } from './CWAPage'

const actions = new Actions()
const selectors = new Selectors()

export class CWAHome extends CWAPage {
  // Interactions

  clickGiftCards() {
    const button = selectors.span('GIFT CARDS')
    actions.click(button)
  }
}
