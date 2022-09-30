import { setEmitFlags } from 'typescript'
import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

export class TaxesPage extends Page {

    getTaxText(column: number) {        
        return actions.get_iframe_column_text(column)
    }

    enableTax(taxIndex: string, taxName: string, taxPercentage: string, taxNumber: string) {
        actions.switchToFrame(0)
        this.clickTax(taxIndex)
            .typeTaxName(taxName)
            .typeTaxPercentage(taxPercentage)
            .typeTaxNumber(taxNumber)
            .clickSave()
    }

    clickTax(taxIndex: string) {
        const label: string = selectors.div_text('Tax ' + taxIndex)
        actions.click(label)
        return this
    }

    typeTaxName(value: string) {
        const input: string = selectors.input_id('TaxForm-name')
        actions.input(input, value)
        return this
    }

    typeTaxPercentage(value: string) {
        const input: string = selectors.input_id('TaxForm-percentage')
        actions.input(input, value)
        return this
    }

    typeTaxNumber(value: string) {
        const input: string = selectors.input_id('TaxForm-taxNumber')
        actions.input(input, value)
        return this
    }

    clickSave() {
        const button: string = selectors.button_string('Save')
        actions.click(button)
    }
}
