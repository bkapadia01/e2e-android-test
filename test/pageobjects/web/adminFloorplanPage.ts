import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()
const selectors = new Selectors()
/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class AdminFloorplan extends Page {
  // #region Interaction

  clickCreateFloorplanButton() {
    actions.click(selectors.button_dataPW('createBtn'))
  }

  inputFloorplanName(name: string) {
    const selector: string = selectors.div_dataPW('dialog-floorplan-name')

    actions.input(`${selector}//input`, name.toString())
  }

  clickSaveFloorplan() {
    actions.click(selectors.button_dataPW('Floorplan-save'))
  }

  // not used at the moment
  clickCreatedFloorplan(index: string) {
    actions.click_if_exists(selectors.div_dataPW(`"floorplan-index-${index}"`))
  }

  clickAddRectangularTable() {
    actions.click(selectors.p_dataPW('add-rectangular-table'))
  }

  clickSaveFloorplanEditedChanges() {
    actions.click(selectors.button_dataPW('createBtn'))
  }

  clickCloseFloorplanEditPage() {
    actions.click(selectors.button_dataPW('cancelBtn'))
  }

  clickIfExistsDeleteTestFloorplan() {
    actions.click_if_exists(selectors.button_dataPW('delete-floorplan-2'), 5000)
  }

  clickIfExistsConfirmDelete() {
    actions.click_if_exists(selectors.button_dataPW('submit-delete-floorplan'))
  }

  clickDeleteTestFloorplan() {
    actions.click(selectors.button_dataPW('delete-floorplan-2'), 5000)
  }

  clickConfirmDeleteFloorplan() {
    actions.click(selectors.button_dataPW('submit-delete-floorplan'))
  }

  deleteTestFloorplan() {
    this.clickDeleteTestFloorplan()
    this.clickConfirmDeleteFloorplan()
  }

  deleteIfExistingTestFloorplan() {
    this.clickIfExistsDeleteTestFloorplan()
    this.clickIfExistsConfirmDelete()
  }
  // #endregion
}
