import { Actions } from '../../../helpers/web/actions'
import { Selectors } from '../../../helpers/web/selectors'
import { Page } from '../../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class LoyaltyPromotionsPage extends Page {
    // Existence

    isLoyaltyPromotionsPagePresent() {
        return actions.await_exists(selectors.h1_text('Promotions'))
    }

    noPromotionsDisplayed() {
      try {
        const selector: string = selectors.h6_text('There are no Promotions to be displayed.')
        return actions.await_exists(selector)
      } catch {
        return false
      }
    }

    rewardNameExits(name: string) {
        try {
            const selector: string = selectors.p_text(name)
            return actions.await_exists(selector)
        } catch {
            return false
        }
    }

    promotionNameContains(name: string) {
        try {
            const selector: string = selectors.a_textContains(name)
            return actions.await_exists(selector)
        } catch {
            return false
        }
    }

    // Interactions

    clickCreateNew() {
        const button: string = selectors.button_dataPW('create-new')
        actions.click(button)
    }

    selectReward(name: string) {
        actions.click(selectors.div_dataPW('reward-id-select'))
        actions.click(selectors.li_text(name))
    }

    clickAdd() {
        const button: string = selectors.button_dataPW('add-btn')
        actions.click(button)
    }

    chooseFilterActive() {
        this.chooseFilterStatus('ACTIVE')
    }

    clickPromotionName(name: string) {
        const selector: string = selectors.a_text(name)
        actions.click(selector)
    }

    clickPromotionNameContains(name: string) {
        const selector: string = selectors.a_textContains(name)
        actions.click(selector)
    }

    typePromotionName(name: string) {
        const textField: string = selectors.input_placeholder('Enter a name')
        actions.input(textField, name, true)
    }

    selectInactive() {
        const selector: string = selectors.input_value('INACTIVE')
        actions.click(selector)
    }
    
    clickPromotionDetails() {
        const button: string = selectors.button_dataPW('tab-details')
        actions.click(button)
    }

    clickSave() {
        const button: string = selectors.button_dataPW('submit-btn')
        actions.click(button)
    }

    // Private

    private chooseFilterStatus(name: string) {
        actions.click(selectors.div_dataPW('display-status-select'))
        actions.click(selectors.li_dataValue(name))
    }
}
