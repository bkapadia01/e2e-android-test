import { Selectors } from './selectors'

const selectors = new Selectors()

const POS_TIMEOUT_EXISTS = parseInt(process.env.POS_TIMEOUT_EXISTS, 20)

export class Actions {
  // MARK: Existence

  find(selector: string) {
    return mobileDriver.$(selector)
  }

  findAll(selector: string) {
    return mobileDriver.$$(selector)
  }

  awaitExists(selector: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.find(selector).waitForExist({ timeout })
  }

  awaitNotExists(selector: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.find(selector).waitForExist({ timeout, reverse: true })
  }

  awaitValue(selector: string, value: string, timeout: number = POS_TIMEOUT_EXISTS) {
    this.awaitExists(selector, timeout)
    return this.find(selector).getAttribute('value') === value
  }

  awaitIfButtonExists(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      return this.awaitExists(selectors.button(name), timeout)
    } catch {
      return false
    }
  }

  awaitIfNameExists(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      return this.awaitExists(selectors.predicateEquals(name), timeout)
    } catch {
      return false
    }
  }

  awaitIfStaticTextExists(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      return this.awaitExists(selectors.staticText(name), timeout)
    } catch {
      return false
    }
  }

  awaitIfPredicateContains(value: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      return this.awaitExists(selectors.predicateContains(value), timeout)
    } catch {
      return false
    }
  }

  awaitIfPredicateEquals(value: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      return this.awaitExists(selectors.predicateEquals(value), timeout)
    } catch {
      return false
    }
  }

  awaitIfSwitchExists(name: string, value: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      return this.awaitValue(selectors.switch(name), value, timeout)
    } catch {
      return false
    }
  }

  // MARK: Interaction

  awaitTap(selector: string, timeout: number = POS_TIMEOUT_EXISTS) {
    this.awaitExists(selector, timeout)
    return this.find(selector).click()
  }

  awaitTapAlertIfExists(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    try {
      this.awaitExists(selectors.button(name), timeout)
      return this.awaitTap(selectors.button(name), timeout)
    } catch {
      return this
    }
  }

  awaitTapAll(selector: string, index: number, timeout: number = POS_TIMEOUT_EXISTS) {
    this.awaitExists(selector, timeout)
    return this.findAll(selector)[index].click()
  }

  awaitTapAlertButton(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTap(selectors.alertButton(name), timeout)
  }

  awaitTapButton(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTap(selectors.button(name), timeout)
  }

  awaitTapButtonContainsName(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTap(selectors.buttonContainsName(name), timeout)
  }

  awaitTapEqualsName(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTap(selectors.predicateEquals(name), timeout)
  }

  awaitTapContainsName(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTap(selectors.predicateContains(name), timeout)
  }

  awaitTapAllContainsName(name: string, index: number, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTapAll(selectors.predicateContains(name), index, timeout)
  }

  awaitTapNavigationBarButton(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    return this.awaitTap(selectors.navigationBarButton(name), timeout)
  }

  awaitDoubleTapContainsName(name: string, timeout: number = POS_TIMEOUT_EXISTS) {
    const element: string = selectors.predicateCe6ontains(name)
    this.awaitExists(element, timeout)
    return this.find(element).doubleClick()
  }

  awaitTapCoordinate(x: number, y: number) {
    mobileDriver.touchAction({
      action: 'tap', x, y
    })
  }

  awaitType(selector: string, text: string) {
    this.awaitExists(selector)
    return this.find(selector).setValue(text)
  }
  
  swipeUp(times: number = 1) {
    var count = times
    while (count > 0) {
      this.swipeFromCoordinates(500, 800, 500, 100)
      count -= 1
    }
  }

  swipeDown(times: number = 1) {
    var count = times
    while (count > 0) {
      this.swipeFromCoordinates(500, 100, 500, 800)
      count -= 1
    }
  }

  swipeFromCoordinates(fromX: number, fromY: number, toX: number, toY: number) {
    this.swipe([fromX, fromY], [toX, toY])
  }

  swipeUpFromElement(element: WebdriverIO.Element) {
    const elementCoords = element.getLocation()
    this.swipe([elementCoords.x, elementCoords.y], [elementCoords.x, 0])
  }

  private swipe(start: [number, number], end: [number, number]) {
    mobileDriver.touchPerform([
      { action: 'press', options: { x: start[0], y: start[1] } },
      { action: 'wait', options: { ms: 1000 } },
      { action: 'moveTo', options: { x: end[0], y: end[1] } },
      { action: 'release', options: {} },
    ])
  }

  saveScreen(screen: string) {
    mobileDriver.saveScreen(screen)
  }

  // Keyboard

  hideKeyboard() {
    return mobileDriver.hideKeyboard()
  }

  // Snapshot

  saveScreenshot(name: string) {
    mobileDriver.saveScreenshot(name)
  }

  // Pause

  pause(milliseconds = 1000) {
    return mobileDriver.pause(milliseconds)
  }

  // Simulator

  restart() {
    mobileDriver.closeApp()
    mobileDriver.launchApp()
  }
}
