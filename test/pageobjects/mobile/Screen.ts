import { Actions } from '../../helpers/mobile/actions'
import { Selectors } from '../../helpers/mobile/selectors'

const actions = new Actions()
const selectors = new Selectors()

const DEFAULT_STABILITY_PAUSE = parseInt(process.env.DEFAULT_STABILITY_PAUSE, 10)

export class Screen {
  isLocalhost: boolean = process.env.ENVIRONMENT === 'localhost'

  // Interactions

  // - Alert

  tapAcceptLocationPermission() {
    try {
      this.tapDismissAlert('Allow While Using App', 2000)
      return this
    } catch {
      return this
    }
  }

  tapDismissContactAlert() {
      browser.pause(3000) // REVIEW: It needs investigation why it fails here on some cases.
      
      actions.awaitTapAlertIfExists('OK', 2000)
      return this
  }
  
  tapDismissAlert(name: string, timeout: number) {
    try {
      actions.awaitTapEqualsName(name, timeout)
      return true
    } catch {
      return false
    }
  }

  // - Cell

  tapCellWithName(name: string) {
    const element: string = selectors.cell(name)
    return actions.awaitTap(element)
  }

  // - Type Value for TextField or SecureTextFields

  typeTextFieldByName(name: string, text: string) {
    const element: string = selectors.predicateEquals(name)
    return actions.awaitType(element, text)
  }

  typeTextFieldByValue(value: string, text: string) {
    const element: string = selectors.predicateValue(value)
    return actions.awaitType(element, text)
  }
    
  typeTextFieldValueForCellWithName(name: string, text: string) {
    const element: string = selectors.textFieldForCellWithName(name)
    return actions.awaitType(element, text)
  }

  typeTextFieldValueForAlertWithName(name: string, text: string) {
    const element: string = selectors.textFieldForAlertWithName(name)
    return actions.awaitType(element, text)
  }

  typeTextFieldWithPlaceholder(name: string, text: string) {
    const element: string = selectors.textField(name)
    return actions.awaitType(element, text)
  }

  typeSecureTextFieldWithPlaceholder(name: string, text: string) {
    const element: string = selectors.secureTextField(name)
    return actions.awaitType(element, text)
  }



  private getElementTexts(selector: string): string[] {
    actions.awaitExists(selector)

    const staticTexts: Array<WebdriverIO.Element> = actions.findAll(selector)
    const texts: string[] = []
    staticTexts.forEach((element) => {
      texts.push(element.getText())
    })

    return texts
  }

  private checkValueFromTexts(texts: string[], value: string) {
    const index = texts.indexOf(value)
    if (index !== -1) {
      return texts[index] == value
    }
    return false
  }

  private checkPairValueFromTexts(texts: string[], key: string, value: string) {
    const index = texts.indexOf(key)
    if (index !== -1) {
      return texts[index + 1] == value
    }
    return false
  }

  // Switch

  setSwitchWithName(name: string, value: boolean) {
    const element = actions.find(selectors.switchEquals(name))
    let valueCheck = false
    if (element.getAttribute('value') === '1') {
      valueCheck = true
    }

    if (value !== valueCheck) {
      element.click()
    }
  }

  setSwitchWithNameContains(name: string, value: boolean) {
    const element = actions.find(selectors.switchContainsName(name))
    let valueCheck = false
    if (element.getAttribute('value') === '1') {
      valueCheck = true
    }

    if (value !== valueCheck) {
      element.click()
    }
  }

  tapSwitchForCellWithName(name: string): string {
    const selector = selectors.switchForCellWithName(name)
    return actions.awaitTap(selector)
  }

  selectOptionValue(fieldName: string, value: string) {
    actions.awaitTapEqualsName(fieldName)
    actions.awaitTapEqualsName(value)
  }

  selectMultipleOptionsValue(fieldName: string, values: Array<string>) {
    actions.awaitTapEqualsName(fieldName)

    // Clear all values first
    const checkmarks: Array<WebdriverIO.Element> = actions.findAll( '//XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage/preceding-sibling::XCUIElementTypeStaticText')

    checkmarks.forEach((element) => {
      element.click()
    })

    // Now click on elements we want to select
    values.forEach((element) => {
      actions.awaitTapEqualsName(element)
    })

    actions.awaitTapEqualsName('Back')
  }

  // Swipe
  
  swipeUp(times: number = 1) {
    actions.swipeUp(times)
    return this
  }

  // Keyboard
    
  hideKeyboard() {
    actions.hideKeyboard()
    return this
  }

  // Pause

  pause(timeout = DEFAULT_STABILITY_PAUSE) {
    // eslint-disable-next-line no-console
    console.log(`Waiting for ${timeout.toString()} milliseconds...`)
    actions.pause(timeout)
  }
}
