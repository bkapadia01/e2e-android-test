import { Selectors } from '../../../helpers/web/selectors'
import { Actions } from '../../../helpers/web/actions'
import { CWAPage } from './CWAPage'

const actions = new Actions()
const selectors = new Selectors()

export class CWAGiftCardsPage extends CWAPage {
  // Existence

  isGiftCardsPagePresent() {
    const selector = selectors.span_class('swiper-pagination-handle')
    return actions.await_exists(selector, 10000)
  }

  getLastGiftCardsAmount() {
    const selector = `//tu-gift-card[last()]` + selectors.h1_class('tu-gift-card__title')
    return actions.awaitGetText(selector, 10000)
  }

  // Interactions

  clickLastGiftCard() {
    const selector = selectors.span_class('swiper-pagination-handle') + '[last()]'
    actions.click(selector, 10000)
  }

  getLastGiftCardsCode() {
    const selector = `//tu-gift-card[last()]` + selectors.p_class('tu-gift-card__code')
    return actions.awaitGetText(selector, 10000)
  }
}
