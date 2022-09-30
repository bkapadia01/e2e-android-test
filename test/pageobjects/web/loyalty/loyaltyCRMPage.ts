import { Actions } from '../../../helpers/web/actions'
import { Selectors } from '../../../helpers/web/selectors'
import { Page } from '../../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class LoyaltyCRMPage extends Page {
    // Existence

    messageExits(name: string) {
        try {
            const selector: string = selectors.p_text(name)
            return actions.await_exists(selector)
        } catch {
            return false
        }
    }

    // Interactions

    clickPromotionsAndCommunications() {
        const button: string = selectors.button_dataPW('promotions-and-comm')
        actions.click(button)
    }

    clickShowGuestSearch() {
        const button: string = selectors.button_dataPW('show-guest-search-btn')
        actions.click(button)
    }

    selectFilterLastName() {
        actions.click(selectors.div_dataPW('guest-search-select'))
        actions.click(selectors.option_dataPW('guest-search-select-item-userLastName'))
    }

    typeSearch(value: string) {
        const textField: string = selectors.input_placeholder('Search...')
        actions.input(textField, value, true, true)
    }

    selectPromotionToSend(name: string) {
        actions.click(selectors.div_dataPW('promotion-id-select'))
        actions.click(selectors.option_text(name))
    }

    clickSendTo1Guest() {
        const button: string = selectors.button_dataPW('send-promotion-btn')
        actions.click(button)
    }

    clickCancel() {
        const button: string = selectors.button_dataPW('cancel-btn')
        actions.click(button)
    }
}
