import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://order.tbdine.com/pickup
 */
const TBDINE_ORDER_TIMEOUT = parseInt(process.env.TBDINE_ORDER_TIMEOUT, 10)

export class TBDineCheckoutPage extends Page {
  // Existence
  
  getTextGiftCardAmountSpent() {
    return actions.find(actions.get_childElement(selectors.div_dataTest('cart-widget'), selectors.p_dataTest('dgc-amount-spent'))).getText()
  }

  getTextSelectedRewardAmount() {
    return actions.find(actions.get_childElement(selectors.div_dataTest('cart-widget'), selectors.p_dataTest('discount-amount'))).getText()
  }

  getTextPointsEarned(value: string) {
    return actions.find(actions.get_childElement(selectors.div_dataTest('loyalty-earnings'), selectors.h5_text(value))).getText()
  }

  getTextPointsUsed(value: string) {
    return actions.find(actions.get_childElement(selectors.div_dataTest('loyalty-redemptions'), selectors.h5_text(value))).getText()
  }

   // Interactions

  selectCashPayment() {
    const cashPayment: string = selectors.radio_labelFor('cash')
    actions.click(cashPayment)
  }

  selectApplyGiftCard() {
    const selectGiftCard = actions.find(selectors.div_dataTest('gift-card-picker')).$(selectors.i_dataTest('add_circle'))
    actions.click(selectGiftCard)
  }

  clickApplyLoyaltyReward() {
    const clickApplyLoyaltyReward: string = actions.get_childElement(selectors.div_dataTest('cart-widget'), selectors.p_dataTest('apply-loyalty-reward-button'))
    actions.click(clickApplyLoyaltyReward)
  }

  selectRewardToRedeem() {
    const selectReward: string = selectors.div_dataTest('loyalty-rewards-modal-radio')
    actions.click(selectReward)
  }

  clickRedeemReward() {
    const selectRedeemReward: string = selectors.button_dataTest('redeem-rewards-button')
    actions.click(selectRedeemReward)
  }

  clickPlaceOrder() {
    const selector: string = selectors.button_text('Place Order')
    actions.click(selector)
    actions.awaitDisappeared(selector, TBDINE_ORDER_TIMEOUT)
  }

  verifyOrderPlaced():boolean {
    const orderPlaceCheckMark = '//i[@data-test="check_circle"]'
    return actions.awaitElement(orderPlaceCheckMark)
  }
}
