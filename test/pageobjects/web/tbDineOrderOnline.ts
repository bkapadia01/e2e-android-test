import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://order.tbdine.com/pickup
 */
export class TBDineOrderOnline extends Page {
  // Existence

  checkItemImageWithItemNameExists(itemName: string) {
    const findItemImageWithName = actions.find(selectors.div_itemImage()).$(selectors.h4_text(itemName))
    return actions.await_exists(findItemImageWithName)
  }

  checkLoyaltyRewardModalExists() {
    const venueRewardsModal = selectors.div_dataTest('venue-rewards-modal')
    return actions.await_exists(venueRewardsModal)
  }

  checkLoyaltyRewardNameExists(rewardName: string) {
    const loyaltyRewardWithName = selectors.h3_text(rewardName)
    return actions.await_exists(loyaltyRewardWithName)
  }

  checkErrorExists(value: string) {
    const errorLine: string = selectors.h5_error_text(value)
    return actions.awaitExists(errorLine)
  }

  isAddButtonDisabled(value: string){
    const selector: string = selectors.div_dataTest(`modifier-option-container-${value}`) + selectors.i_disabled_dataTest('add_circle')
    return actions.awaitExists(selector)
  }

  checkModifiersExists(value: string){
    const selector: string = selectors.div_dataTest(`cart-item-modifier-220427013858~${value}`)
    return actions.awaitExists(selector)
  }

  // Interactions
  
  dismissModalScreen() {
    actions.press_esc()
  }

  closeModalScreen() {
    actions.click('/html/body/div/section/div/header/i')
  }

  clickMenuItem(name: string) {
    const selector = selectors.h4_text(name)
    actions.click(selector)
  }

  clickReceiptMenuButton() {
    const receiptMenuButton: string = selectors.button_dataTest('order-receipt-menu-button')
    actions.click(receiptMenuButton)
  }

  clickLoyaltyRewardButton() {
    const loyaltyRewardButton: string = selectors.button_dataTest('loyalty-rewards-link')
    actions.click(loyaltyRewardButton)
  }

  selectOrder(value: string) {
    const orderDrinkMenuFirst: string = selectors.div_buttonRole(value)
    actions.click(orderDrinkMenuFirst)
  }

  addToCart() {
    const addItemToCart: string = selectors.button_dataTest('edit-item-modal-submit')
    actions.click(addItemToCart)
  }

  clickAdd(value: string){
    const selector: string = selectors.div_dataTest(`modifier-option-container-${value}`) + selectors.i_dataTest('add_circle')
    actions.click(selector)
  }
  
  clickRemove(value: string){
    const selector: string = selectors.div_dataTest(`modifier-option-container-${value}`) + selectors.i_dataTest('remove_circle')
    actions.click(selector)
  }

  checkoutCart() {
    const selector: string = selectors.button_text('Checkout')
    actions.click(selector)
  }
}
