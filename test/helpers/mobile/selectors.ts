/**
 * Contains several strategies for selecting elements on the page
 */

export class Selectors {
  // Elements

  buttonContainsName(name: string) {
    return `//android.widget.TextView[@text="${name}"]`
  }

  textFieldWithIndex(index: number) {
    return `//android.widget.EditText[${index}]`
  }
}
