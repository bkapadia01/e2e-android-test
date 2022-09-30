import { Actions } from '../../../helpers/web/actions'
import { Selectors } from '../../../helpers/web/selectors'
import { Page } from '../../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class LoyaltyRewardPage extends Page {
    // Existence

    isLoyaltyRewardPagePresent() {
        return actions.await_exists(selectors.h1_text('Rewards'))
    }

    noRewardsDisplayed() {
      try {
        const selector: string = selectors.h6_text('You currently have no Rewards to be displayed.')
        return actions.await_exists(selector)
      } catch {
        return false
      }
    }

    rewardNameExists(name: string) {
        try {
            const selector: string = selectors.a_text(name)
            return actions.await_exists(selector)
        } catch {
            return false
        }
    }

    rewardNameContains(name: string) {
        try {
            const selector: string = selectors.a_textContains(name)
            return actions.await_exists(selector)
        } catch {
            return false
        }
    }

    menuItemNameExits(name: string) {
        try {
            const selector: string = selectors.p_text(name)
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

    chooseFilterActive() {
        this.chooseFilterStatus('ACTIVE')
    }

    chooseFilterInactive() {
        this.chooseFilterStatus('INACTIVE')
    }

    clickRewardName(name: string) {
        const selector: string = selectors.a_text(name)
        actions.click(selector)
    }

    clickRewardNameContains(name: string) {
        const selector: string = selectors.a_textContains(name)
        actions.click(selector)
    }

    selectCheckDiscountFixed() {
        const button: string = selectors.button_id('reward-selector-checkfixed')
        actions.click(button)
    }

    selectCheckDiscountPercentage() {
        const button: string = selectors.button_id('reward-selector-checkpercentage')
        actions.click(button)
    }

    selectCheckDiscountItemFixed() {
        const button: string = selectors.button_id('reward-selector-itemfixed')
        actions.click(button)
    }

    selectCheckDiscountItemPercentage() {
        const button: string = selectors.button_id('reward-selector-itempercentage')
        actions.click(button)
    }

    selectCheckDiscountItemBOGO() {
        const button: string = selectors.button_id('reward-selector-itembogo')
        actions.click(button)
    }

    typeRewardName(name: string) {
        const textField: string = selectors.input_placeholder('Enter a name')
        actions.input(textField, name, true)
    }

    selectActive() {
        const selector: string = selectors.input_value('ACTIVE')
        actions.click(selector)
    }

    selectInactive() {
        const selector: string = selectors.input_value('INACTIVE')
        actions.click(selector)
    }

    typeDiscount(value: string) {
        const textField: string = selectors.input_id('discount')
        actions.input(textField, value, true)
    }

    typePoints(value: number) {
        const textField: string = selectors.input_id('points')
        actions.input(textField, value.toString(), true)
    }

    typeDescription(value: string) {
        const textArea: string = selectors.textarea_id('description')
        actions.input(textArea, value.toString(), true)
    }
    
    clickSelectGroupItems() {
        const button: string = selectors.button_dataPW('select-menu-items-groups-btn')
        actions.click(button)
    }
    
    clickSelectGroupItemsBogoBuy() {
        const button: string = selectors.button_dataPW('select-menu-items-groups-btn-bogo-buy')
        actions.click(button)
    }
    
    clickSelectGroupItemsBogoGet() {
        const button: string = selectors.button_dataPW('select-menu-items-groups-btn-bogo-get')
        actions.click(button)
    }
    
    clickTabMenuItems() {
        const button: string = selectors.button_dataPW('tab-menuItems')
        actions.click(button)
    }
    
    clickTabMenuItemsProhibitedGroupsItems() {
        const button: string = selectors.button_dataPW('tab-menuItemsmenu-block-tabs')
        actions.click(button)
    }
    
    clickTabMenuItemsBogoBuy() {
        const button: string = selectors.button_dataPW('tab-menuItemsmenu-block-tabs-bogo-buy')
        actions.click(button)
    }
    
    clickTabMenuItemsBogoGet() {
        const button: string = selectors.button_dataPW('tab-menuItemsmenu-block-tabs-bogo-get')
        actions.click(button)
    }

    typeMenuItem(value: string) {
        const textField: string = selectors.input_placeholder('Search by Item name')
        actions.input(textField, value, true, true)
    }

    selectMenuItem() {
        const checkbox = selectors.span_dataPw('menu-modal-component-item-option-checkbox')
        actions.click(checkbox)
    }

    clickApply() {
        const button: string = selectors.button_dataPW('menu-modal-component-apply')
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
