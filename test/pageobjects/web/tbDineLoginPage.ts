import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

const TBDINE_LOGIN_TIMEOUT = parseInt(process.env.TBDINE_LOGIN_TIMEOUT, 10)

/**
 * Contains all functionality for the domain https://order.tbdine.com/pickup
 */
export class TBDineLoginPage extends Page {
  // #region Interaction
  /**
   * Login to manage with supplied credentials.
   * Defaults to .env credentials TBDINE_CUSTOMER_USERNAME and TBDINE_CUSTOMER_PASSWORD
   * @param {*} name - username
   * @param {*} pass - password
   */
  loginTBDinePickupWithCustomerCred(name: string, pass: string) {
    const signInButton: string = selectors.button_string('Sign In')
    const email: string = selectors.input_id('signInName')
    const password: string = selectors.input_id('password')
    const signIn: string =  selectors.button_id('next')
    
    actions.click(signInButton)
    actions.input(email, name)
    actions.input(password, pass)
    actions.click(signIn)
    actions.awaitDisappeared(signIn, TBDINE_LOGIN_TIMEOUT)
  }
}
