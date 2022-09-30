import { Actions } from '../../../helpers/web/actions'
import { Selectors } from '../../../helpers/web/selectors'
import { CWAPage } from './CWAPage'

const actions = new Actions()
const selectors = new Selectors()

const ADMIN_LOGIN_TIMEOUT = parseInt(process.env.ADMIN_LOGIN_TIMEOUT, 10)

/**
 * Contains all functionality for the domain https://app.tableup.com/
 */
export class CWAProfilePage extends CWAPage {
  // Interactions
  
  loginWithCredentials(name: string, pass: string) {
    const email = selectors.input_type('email')
    const password = selectors.input_type('password')
    const signIn =  selectors.button_type('submit')

    actions.input(email, name)
    actions.input(password, pass)
    actions.click(signIn)
    actions.awaitDisappeared(signIn, ADMIN_LOGIN_TIMEOUT)
  }
}
