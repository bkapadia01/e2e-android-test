/**
 * Contains several strategies on selecting elements on the web page
 */

export class Selectors {
  a_text(value: string) {
    return `//a[text()="${value}"]`
  }
  
  a_textContains(value: string) {
    return `//a[contains(text(), '${value}')]`
  }

  a_id(value: string) {
    return `//a[@id="${value}"]`
  }

  a_href(value: string) {
    return `//a[@href="${value}"]`
  }

  a_href_contains(value: string) {
    return `//a[contains(@href,"${value}")]`
  }

  a_dataPW(value: string) {
    return `//a[@data-pw="${value}"]`
  }

  button_dataPW(value: string) {
    return `//button[@data-pw="${value}"]`
  }

  button_dataCY(value: string) {
    return `//button[@data-cy="${value}"]`
  }
  
  button_spanContainsText(value: string) {
    return `//span[contains(text(), '${value}')]`
  }

  button_id(value: string) {
    return `//button[@id="${value}"]`
  }

  div_buttonRole(value: string) {
    return `(//div[@role='button'])[${value}]`
  }

  button_dataID(value: string) {
    return `//button[@data-testid="${value}"]`
  }
  
  button_dataTest(value: string) {
    return `//button[@data-test="${value}"]`
  }

  button_string(value: string) {
    return `//button[normalize-space()='${value}']`
  }

  button_type(value: string) {
    return `//button[@type="${value}"]`
  }

  button_text(value: string) {
    return `//button[text()="${value}"]`
  }

  div_dataPW(value: string) {
    return `//div[@data-pw="${value}"]`
  }

  div_dataTestStartsWith(value: string) {
    return `//div[starts-with(@data-test,"${value}")]`
  }

  div_dataCY(value: string) {
    return `//div[@data-cy="${value}"]`
  }

  div_text(value: string) {
    return `//div[text()="${value}"]`
  }

  input_id(value: string) {
    return `//input[@id="${value}"]`
  }

  input_dataTest(value: string) {
    return `//input[@data-test="${value}"]`
  }

  input_type(value: string) {
    return `//input[@type="${value}"]`
  }

  input_name(value: string) {
    return `//input[@name="${value}"]`
  }

  input_placeholder(value: string) {
    return `//input[@placeholder="${value}"]`
  }

  input_radio_value(value: string) {
    return `//input[@type="radio"][@value="${value}"]`
  }

  input_value(value: string) {
    return `//input[@value="${value}"]`
  }

  i_dataTest(value: string) {
    return `//i[@data-test="${value}"]`
  }

  i_disabled_dataTest(value: string) {
    return `//i[@data-test="${value}"][@disabled]`
  }
  
  radio_labelFor(value: string) {
    return `//label[@for='${value}']`
  }

  span(value: string) {
    return `//span[text()="${value}"]`
  }

  span_class(value: string) {
    return `//span[@class="${value}"]`
  }

  span_dataPw(value: string) {
    return `//span[@data-pw="${value}"]`
  }

  div_itemImage() {
   return '//div[starts-with(@data-test,"item-image")]'
  }

  div_dataTest(value: string) {
    return `//div[@data-test="${value}"]`
  }

  li_dataValue(value: string) {
    return `//li[@data-value="${value}"]`
  }
  
  li_text(value: string) {
    return `//li[text()="${value}"]`
  }

  h1_class(value: string) {
    return `//h1[@class="${value}"]`
  }
  
  h1_text(value: string) {
    return `//h1[text()="${value}"]`
  }
  
  h4_text(value: string) {
    return `//h4[text()="${value}"]`
  }
  
  h3_text(value: string) {
    return `//h3[(text()="${value}")]`
  }

  h5_text(value: string) {
    return `//h5[(text()="${value}")]`
  }

  h5_error_text(value: string) {
    return `//h5[@color="ERROR"][(text()="${value}")]`
  }
  
  h6_text(value: string) {
    return `//h6[text()="${value}"]`
  }

  option_dataPW(value: string) {
    return `//option[@data-pw="${value}"]`
  }
  
  option_text(value: string) {
    return `//option[text()="${value}"]`
  }

  p_dataPW(value: string) {
    return `//p[@data-pw="${value}"]`
  }

  p_dataTest(value: string) {
    return `//p[@data-test="${value}"]`
  }

  p_class(value: string) {
    return `//p[@class="${value}"]`
  }

  p_last_class(value: string) {
    return `//p[@class="${value}"][last()]`
  }

  p_text(value: string) {
    return `//p[text()="${value}"]`
  }

  textarea_id(value: string) {
    return `//textarea[@id="${value}"]`
  }
}
