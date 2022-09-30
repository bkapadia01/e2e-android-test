import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

const ADMIN_LOGIN_TIMEOUT = parseInt(process.env.ADMIN_LOGIN_TIMEOUT, 10)

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class AdminLoginPage extends Page {
  loginWithCredentials(name: string, pass: string) {
    const oktaUsername: string = selectors.input_id('okta-signin-username')
    const oktaPassword: string = selectors.input_id('okta-signin-password')
    const oktaLogin: string = selectors.input_id('okta-signin-submit')

    actions.input(oktaUsername, name)
    actions.input(oktaPassword, pass)
    actions.click(oktaLogin)
    actions.awaitDisappeared(oktaLogin, ADMIN_LOGIN_TIMEOUT)
  }

  clickDismissUpgradeButton() {
    const xpath: string = selectors.button_dataPW('dismiss-btn')
    if (actions.await_exists(xpath, 2000)) {
      actions.click(xpath)
    }
    return this
  }
}
