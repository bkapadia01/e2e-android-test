import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const selectors = new Selectors()
const actions = new Actions()

const MANAGE_LOGIN_TIMEOUT = parseInt(process.env.MANAGE_LOGIN_TIMEOUT, 10)
const MANAGE_UNLINK_TIMEOUT = parseInt(process.env.MANAGE_UNLINK_TIMEOUT, 10)
const DEFAULT_STABILITY_PAUSE = parseInt(process.env.DEFAULT_STABILITY_PAUSE, 10)

export class ManagePage extends Page {
  private static patchCode

  // #region Interaction
  openRestaurant(venueid: string) {
    this.openManage(`/restaurant/${venueid}`)
  }

  openRestaurantPatchPage(venueId: string) {
    this.openManage(`/restaurant/diagnostics/patches/${venueId}`)
  }

  /**
   * Login to manage with supplied credentials.
   * Defaults to .env credentials MANAGE_USER and MANAGE_PASSWORD
   * @param {*} name - username
   * @param {*} pass - password
   */
  loginWithCredentials(name = process.env.MANAGE_USER, pass = process.env.MANAGE_PASSWORD) {
    const username: string = selectors.input_name('username')
    const password: string = selectors.input_name('password')
    const login: string = selectors.input_id('LoginFormButton')

    actions.input(username, name)
    actions.input(password, pass)
    actions.click(login)
    actions.awaitDisappeared(login, MANAGE_LOGIN_TIMEOUT)
  }

  /**
   * Unlinks license from currently viewed venue on Manage
   * There is a failsafe to ensure that in case the license is already unlinked, it will return without fail
   */
  unlinkLicense() {
    const unlink_button = '//input[@type="submit"][@value="Unlink licence"]'
    actions.click(selectors.a_id('licences_last'))

    if (actions.find(unlink_button).isExisting()) {
      actions.pause(DEFAULT_STABILITY_PAUSE)
      actions.click(unlink_button)
      this.acceptAlert()
      actions.awaitDisappeared(unlink_button, MANAGE_UNLINK_TIMEOUT)
    }
  }

  createProLicense() {
    actions.click(selectors.input_id('EvergreenButton'))
    actions.click(selectors.input_value('Set Licence'))
  }

  saveScreenImage(fileName: string) {
    actions.saveScreenImage(fileName)
  }
 
  checkScreenImage(fileName: string) {
    return actions.checkScreenImage(fileName)
  }

  createPatchCode(patchCode: string) {
    const patchCodeField = `//tr[3]/td[2]/textarea`
    const createPatchButton = `//*[@id="patchSubmit"]`

    actions.scroll_into_view(patchCodeField)
    actions.input(patchCodeField, patchCode)
    actions.click(createPatchButton)
    
    browser.pause(1000)

    this.acceptAlert()
  }

  copyPatchCode() {
    const patchCodeCell = `/html/body/div[2]/table/tbody/tr[1]/td[1]`
    const patchCode = actions.get_value_of_cell(patchCodeCell)

    ManagePage.patchCode = patchCode
    return ManagePage.patchCode
  }

  public getPatchCode() {
    return ManagePage.patchCode
  }
  // #endregion
}
