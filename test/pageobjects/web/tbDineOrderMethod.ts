import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()

/**
 * Contains all functionality for the domain https://order.tbdine.com/pickup
 */
export class TBDineOrderMethod extends Page {

  confirmOrderPickup() {
    const orderMethodSubmit: string = selectors.button_dataTest('order-method-submit')
    actions.click(orderMethodSubmit)
  }
}
