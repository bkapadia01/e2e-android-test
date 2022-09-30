import { Actions } from '../../../helpers/web/actions'
import { Selectors } from '../../../helpers/web/selectors'
import { Page } from '../../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

export class CWAPage extends Page {
  // Interactions
  
  clickHome() {
    const button = selectors.button_text(' Home ')
    actions.click(button)
  }

  clickProfile() {
    const button = selectors.button_text(' Profile ')
    actions.click(button)
  }

  clickHelp() {
    const button = selectors.button_text(' Help ')
    actions.click(button)
  }
}
