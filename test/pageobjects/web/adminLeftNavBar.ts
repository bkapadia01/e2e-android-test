import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const selectors = new Selectors()
const actions = new Actions()

const ADMIN_RESET_VENUE_SYNC_TIMEOUT = parseInt(process.env.ADMIN_RESET_VENUE_SYNC_TIMEOUT, 10)
const DEFAULT_STABILITY_PAUSE = parseInt(process.env.DEFAULT_STABILITY_PAUSE, 10)

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class AdminLeftNavBar extends Page {
  // #region Interaction
  // Navigate Functions
  //
  // Functions that navigate directly to the entity page
  // Simplifies automation so we can go directly to the entities page
  // and also helps with ensuring that we are on the right page.
  //
  // There was also a bug that broke VAF for all entities until the page was refreshed,
  // And using these navigation methods avoids breaking the rest of the tests

  navigateToFloorplan() {
    const floorplan_xpath: string = (selectors.a_dataPW('floorplan') || selectors.a_href('/floorplan'))
    this.refreshPage()
    actions.awaitElement(floorplan_xpath)
    actions.click(floorplan_xpath)
  }

  navigateToReports() {
    const xpath: string = (selectors.a_dataPW('reports') || selectors.a_href('/reports'))
    actions.click(xpath)
  }

  navigateToOnlineOrdering() {
    const xpath: string = (selectors.a_dataPW('online_ordering') || selectors.a_href('/reports/online-ordering'))
    actions.click(xpath)
  }

  navigateToGuestEngagement() {
    actions.click(selectors.button_dataPW('ge.guest_engagement'))
  }

  clickPromotions() {
    actions.click(selectors.a_dataPW('ge.marketing.promotions'))
  }

  clickCRM() {
    actions.click(selectors.a_dataPW('ge.guest_reporting'))
  }

  navigateToReportsAudit() {
    const xpath: string = (selectors.a_dataPW('audit') || selectors.a_href('/reports/audit'))
    actions.click(xpath)
  }

  navigateToDevices() {
    const xpath: string = selectors.button_dataPW('devices.devices')
    const menuHamurgerButton: string = selectors.button_dataPW('hamburger-button')

    if(actions.await_exists(xpath, 1000)) {
      actions.click(xpath)
    } else {
      actions.click_if_exists(menuHamurgerButton, 1000)
      actions.click_if_exists(xpath, 1000)
    }
  }

  // Actions for navigating various entities

  clickMenu() {
    actions.click(selectors.a_href('/menus'))
  }

  clickVoidReasons() {
    actions.click(selectors.a_href('/menus/voids'))
  }

  clickDiscounts() {
    actions.click(selectors.a_href('/menus/discounts'))
  }

  clickPrinters() {
    actions.click(selectors.a_href('/menus/printers'))
  }

  clickModifierGroups() {
    actions.click(selectors.a_href('/menus/modifier-groups'))
  }

  clickMenuItems() {
    actions.click(selectors.a_href('/menus/menu-items'))
  }

  clickMenuGroups() {
    actions.click(selectors.a_href('/menus/menu-groups'))
  }

  clickMenuPages() {
    actions.click(selectors.a_href('/menus/menus'))
  }

  clickSalesCategories() {
    actions.click(selectors.a_href('/menus/sales-categories'))
  }

  clickTaxes() {
    actions.click(selectors.a_href('/menus/taxes'))
  }

  clickEntityByName(name: string) {
    actions.click(`(//tr[@data-cy="table-row"] | //div[@data-cy="drag-list"])//div[text()="${name}"]`)
  }

  clickMenuItemByName(name: string) {
    actions.click(`(//tr[@data-cy="table-row"] | //div[@data-cy="drag-list"])//span[text()="${name} "]`)
  }

  clickCreateButton() {
    actions.click(selectors.button_dataCY('createBtn'))
  }

  clickSaveButton() {
    const saveButton: string = selectors.button_dataCY('saveButton')

    actions.click(`${saveButton} or @data-cy="save"]`)
    // Ensure that we see success message pop up
    actions.awaitElement(`//div[contains(@class, "MuiSnackbar")]//p[contains(text()," has been added") or contains(text()," has been saved") or contains(text(),"has been created")]`, 10000)
  }

  clickCancelButton(exists = true) {
    const xpath: string = selectors.button_dataCY('closeForm')

    if (exists) {
      actions.click(xpath)
    } else {
      actions.click_if_exists(xpath, DEFAULT_STABILITY_PAUSE)
    }
  }

  clickCloseButton(exists = true) {
    const xpath = `//button[@data-cy="cancel"]`

    if (exists) {
      actions.click(xpath)
    } else {
      actions.click_if_exists(xpath, DEFAULT_STABILITY_PAUSE)
    }
  }

  /**
   * Resets VAF venue sync
   * Assumes you have logged into VAF and are currently on the main page
   * where "Reset Menu Management" button is visible
   */
  resetVafSync() {
    const tb_button = selectors.button_dataID('tb-button')

    actions.click(selectors.a_href('/menus/reset-rmm'))
    actions.click(`${tb_button}[@data-cy="resetButton"]`)
    actions.click(`${tb_button}[@data-cy="confirm"]`)
    actions.awaitDisappeared(`${tb_button}[@data-cy="confirm"]`, ADMIN_RESET_VENUE_SYNC_TIMEOUT)
  }
  // #endregion
}
