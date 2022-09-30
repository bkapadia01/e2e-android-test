import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class AdminDevices extends Page {
  private static deviceCode

  // #region Interaction 
  clickConnectMainDevice(exists = true) {
    const connectMainDevice: string = selectors.span('Connect Main Device')

    if (exists) {
      actions.scroll_into_view(connectMainDevice)
      actions.click(connectMainDevice)
    } else {
      actions.click_if_exists(connectMainDevice, 1000)
    }
  }

  // not being used at the moment
  inputDeviceLabel(text: string) {
    actions.input(selectors.input_name('deviceLabel'), text)
  }

  // not being used at the moment
  clickAddDeviceNext(exists = true) {
    const xpath: string = selectors.button_dataPW('Wizard-advance')

    if (exists) {
      actions.click(xpath)
    } else {
      actions.click_if_exists(xpath, 1000)
    }
  }

  getDeviceLinkingCode() {
    const xpath: string = selectors.div_dataPW('ConnectMainDeviceModal-deviceCode')
    AdminDevices.deviceCode = actions.awaitGetText(xpath)
    return AdminDevices.deviceCode
  }

  public getDeviceCode() {
    return AdminDevices.deviceCode
  }

  clickDone(exists = true) {
    const xpath: string = selectors.button_dataPW('Wizard-advance')

    if (exists) {
      actions.click(xpath)
    } else {
      actions.click_if_exists(xpath, 1000)
    }
  }

  deleteIfExistingLinkedDevice() {
    const xpath = `//*[starts-with(@data-pw,"device-logo")]`

    browser.pause(5000)
    
    actions.click_if_exists(xpath, 2000)
    actions.click_if_exists(selectors.button_dataPW('delete-device'), 1000)
    actions.click_if_exists(selectors.button_dataPW('submit-delete-device'), 1000)
  }

  verifyMainPOSExists() {
    const selector: string = selectors.div_dataPW('device-grid-item')
    actions.find(`${selector}//p[1]`)
  }
  // #endregion
}
