import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

export class SalesCategoryPage extends Page {

    getSalesCategoryText(row: number) {       
        return actions.get_iframe_row_text(row)
    }

    createSalesCategory(value: string) {
        actions.switchToFrame(0)
        this.clickCreateSalesCategory()
            .typeSalesCategoryName(value)
            .clickSave()
    }

    clickCreateSalesCategory() {
        const button: string = selectors.button_string('Create Sales Category')
        actions.click(button)
        return this
    }

    typeSalesCategoryName(value: string) {
        const textField: string = selectors.input_id('SalesCategoryForm-name')
        actions.input(textField, value, true)
        return this
    }

    clickSave() {
        const button: string = selectors.button_string('Save')
        actions.click(button)
    }

}
