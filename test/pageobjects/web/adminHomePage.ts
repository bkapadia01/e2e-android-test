import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

export class AdminHomePage extends Page {

  verifyUserLoggedIn():boolean {
    const xpath: string = selectors.button_dataPW('devices.devices')
    return actions.await_exists(xpath)
  }
}
