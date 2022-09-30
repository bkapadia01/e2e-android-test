import { Selectors } from './selectors'

const selectors = new Selectors()

const DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT = parseInt(process.env.DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT, 10)

export class Actions {
  // MARK: Existence

  find(selector: string) {
    return webDriver.$(selector)
  }

  find_all(selector: string) {
    return webDriver.$$(selector)
  }

  awaitExists(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    return this.find(selector).waitForExist({ timeout })
  }

  awaitNotExists(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    return this.find(selector).waitForExist({ timeout, reverse: true })
  }

  awaitClickable(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    return this.find(selector).waitForClickable({ timeout })
  }

  awaitDisappeared(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    return this.find(selector).waitForDisplayed({ timeout, reverse: true })
  }
  
  awaitElement(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    return this.find(selector).waitForDisplayed({ timeout })
  }

  awaitGetText(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    this.awaitExists(selector, timeout)
    const element: WebdriverIO.Element = this.find(selector)
    return element.getText()
  }

  checkScreenImage(fileName: string) {
    return webDriver.checkScreen(fileName, { 
      disableCSSAnimation: true,
      hideScrollBars: true,
    })
  }

  // MARK: Interaction

  open(url: string) {
    return webDriver.url(url)
  }

  switchToFrame(frame:number) {
    webDriver.switchToFrame(frame)
  }

  switchToParentFrame() {
    webDriver.switchToParentFrame()
  }
  /**
   * Clicks an element
   * Will fail if element does not exist
   */
  click(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    this.awaitExists(selector, timeout)
    return this.find(selector).click()
  }

  click_if_exists(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    try {
      this.awaitElement(selector, timeout)
      return this.click(selector)
    } catch {
      return false
    }
  }

  await_exists(selector: string, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    try {
      return this.awaitElement(selector, timeout)
    } catch {
      return false
    }
  }

  input(selector: string, text: string, deleteExistingValues: boolean = false, breakLine: boolean = false, timeout: number = DEFAULT_WAIT_FOR_ELEMENTS_TIMEOUT) {
    this.awaitElement(selector, timeout)
    const element: WebdriverIO.Element = this.find(selector)

    if (deleteExistingValues) {
      const backSpaces = new Array(element.getValue().length).fill('Backspace');
      element.setValue(backSpaces);
    }

    element.setValue(text)

    if (breakLine) {
      const enter = new Array(element.getValue().length).fill('Enter');
      element.setValue(enter);
    }

    return this
  }

  scroll_into_view(selector: string) {
    return this.find(selector).scrollIntoView()
  }

  // Select a value from a single selection drop down menu with "selection text" and name of "dropdown field"
  select_from_dropdown(text: string, dropdownName: string) {
    // Click dropdown to display list of elements to select
    this.click(`//label[contains(text(),"${dropdownName}")]/following-sibling::div[contains(@data-cy, "regular-select")]`)

    // Click desired element by text
    this.click(`(//li[@data-cy="${text}"]|//input[@value="${text}"])`)
  }

  // Select a value from a multi-select selection drop down menu with "selection text" and name of "dropdown field"
  select_from_multiselect_dropdown(text: string, dropdownName: string) {
    // Click dropdown to display list of elements to select
    this.click(`//label[contains(text(),"${dropdownName}")]/following-sibling::div[contains(@data-cy, "multi-select")]`)

    // Click desired element by text
    this.click(selectors.input_value(text))
    this.press_esc()
  }

  /**
   * Get Elements
   */

   get_iframe_row_text(row: number) {
    browser.pause(2000)
    this.switchToFrame(0)
    const rows = this.find_all('tbody tr')
    const text = rows[row].getText()
    this.switchToParentFrame()
    return text
  }

  get_iframe_column_text(column: number) {
    browser.pause(2000)
    this.switchToFrame(0) 
    const columns = this.find_all('tbody tr td')
    const text = columns[column].getText()
    this.switchToParentFrame()
    return text
  }

  get_iframe_div_text(row: number) {
    browser.pause(2000)
    this.switchToFrame(0) 
    const divs = this.find_all('form div div')
    const text = divs[row + 1].getText()
    this.switchToParentFrame()
    return text
  }

  get_text_field_by_label(fieldName: string) {
    const baseXpath = `//label[contains(@id, "-label")][text()="${fieldName}"]/following-sibling::div/`
    return this.find(`${baseXpath}input | ${baseXpath}textarea`)
  }

  get_text_from_element(selector: string) {
    return this.find(selector)
  }

  get_current_select_multi_option_by_label(fieldName: string) {
    const htmlString: string = this.find(`//label[contains(@data-cy, "-label-text")][contains(text(),"${fieldName}")]/following-sibling::div[contains(@data-cy, "-regular-select")]/div[contains(@id, "mui-component-select-")]/span`).getHTML()
    return htmlString.substring(htmlString.indexOf('>') + 1, htmlString.lastIndexOf('</span'))
  }

  get_all_current_select_multi_options_by_label(fieldName: string) {
    const elements: Array<WebdriverIO.Element> = this.find_all(`//label[contains(@class, "MuiFormLabel")][contains(text(),"${fieldName}")]/following-sibling::div[contains(@data-cy, "-multi-select")]/div[contains(@id, "mui-component-select-")]//span[@class="MuiChip-label"]`)
    const values: Array<string> = new Array<string>()

    elements.forEach((element) => {
      const htmlString = element.getHTML()
      values.push(
        htmlString.substring(htmlString.indexOf('>') + 1, htmlString.lastIndexOf('</span'))
      )
    })

    return values
  }

  get_value_of_text_field(fieldName: string) {
    const element: WebdriverIO.Element = this.get_text_field_by_label(fieldName)
    const elementValue = element.getAttribute('value')

    // textarea will have null value and we need to use getText() instead
    if (elementValue == null) {
      return element.getText()
    }
    return elementValue
  }

  get_value_of_cell(selector: string) {
    const element: WebdriverIO.Element = this.get_text_from_element(selector)
    return element.getText()
  }

  /**
   * Snapshots
   */

  saveScreenshot(name: string) {
    webDriver.saveScreenshot(name)
  }
  
  saveScreenImage(fileName: string) {
    webDriver.saveScreen(fileName, {
      disableCSSAnimation: true,
      hideScrollBars: true,
    })
  }

  /**
   * Pause
   */

  pause(milliseconds = 1000) {
    return webDriver.pause(milliseconds)
  }

  /**
   * Press Keys
   */

  press_esc() {
    return webDriver.keys('\uE00C')
  }

  get_childElement(parent: string, child: string) {
    let childElem = child
    if (child[0] === '/') {
      childElem = child.slice(2)
    }
    return `${parent}//descendant::${childElem}`
  }
}
