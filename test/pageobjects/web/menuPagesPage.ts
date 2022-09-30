import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

export class MenuPagesPage extends Page {

    getMenuPageText(row: number) {        
        return actions.get_iframe_div_text(row)
    }

    createMenuPage(menuPageName: string) {
        actions.switchToFrame(0)
        this.clickCreateMenuPage()
            .typeMenuPageName(menuPageName)
            .clickSave()
    }

    clickCreateMenuPage() {
        const button: string = selectors.button_string('Create Menu Page')
        actions.click(button)
        return this
    }

    typeMenuPageName(value: string) {
        const input: string = selectors.input_id('MenuForm-name')
        actions.input(input, value)
        return this
    }

    clickSave() {
        const button: string = selectors.button_string('Save')
        actions.click(button)
    }
}
