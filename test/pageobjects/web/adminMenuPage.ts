import { Discount } from '../../helpers/dataobjects/Discount'
import { MenuCategory } from '../../helpers/dataobjects/MenuCategory'
import { MenuItem } from '../../helpers/dataobjects/MenuItem'
import { MenuPage } from '../../helpers/dataobjects/MenuPage'
import { ModifierGroup } from '../../helpers/dataobjects/ModifierGroup'
import { VoidReason } from '../../helpers/dataobjects/VoidReason'
import { Actions } from '../../helpers/web/actions'
import { Selectors } from '../../helpers/web/selectors'
import { Page } from '../../helpers/web/webPage'

const selectors = new Selectors()
const actions = new Actions()

const VAFWaitTimeout = parseInt(process.env.VAF_WAIT_FOR_ITEMS_TIMEOUT, 10)
const VAF_PAGE_LOAD_STABILITY_PAUSE = parseInt(process.env.VAF_PAGE_LOAD_STABILITY_PAUSE, 10)

/**
 * Contains all functionality for the domain https://admin.touchbistro.com/
 */
export class AdminMenu extends Page {
  // #region Interaction
  
  // Navigate Functions
  //
  // Functions that navigate directly to the entity page
  // Simplifies automation so we can go directly to the entities page
  // and also helps with ensuring that we are on the right page.
  //
  // There was also a bug that broke VAF for all entities until the page was refreshed,
  // And using these navigation methods avoids breaking the rest of the tests

  private navigateToRmmEntityPage(entityURLName: string) {
    this.openAdmin(`/menus/${entityURLName}`)
  }

  navigateToRmmTaxes() {
    this.navigateToRmmEntityPage('taxes')
  }

  navigateToRmmSalesCategories() {
    this.navigateToRmmEntityPage('sales-categories')
  }

  navigateToRmmMenuPages() {
    this.navigateToRmmEntityPage('menus')
  }

  navigateToRmmMenuGroups() {
    this.navigateToRmmEntityPage('menu-groups')
  }

  navigateToRmmMenuItems() {
    this.navigateToRmmEntityPage('menu-items')
  }

  navigateToRmmModifierGroups() {
    this.navigateToRmmEntityPage('modifier-groups')
  }

  navigateToRmmPrinters() {
    this.navigateToRmmEntityPage('printers')
  }

  navigateToRmmDiscounts() {
    this.navigateToRmmEntityPage('discounts')
  }

  navigateToRmmVoids() {
    this.navigateToRmmEntityPage('voids')
  }

  // Actions for navigating various entities

  clickMenu() {
    const selector: string = selectors.a_href('/menus')
    actions.click(selector)
  }

  clickVoidReasons() {
    const selector: string = selectors.a_href('/menus/voids')
    actions.click(selector)
  }

  clickDiscounts() {
    const selector: string = selectors.a_href('/menus/discounts')
    actions.click(selector)
  }

  clickPrinters() {
    const selector: string = selectors.a_href('/menus/printers')
    actions.click(selector)
  }

  clickModifierGroups() {
    const selector: string = selectors.a_href('/menus/modifier-groups')
    actions.click(selector)
  }

  clickMenuItems() {
    const selector: string = selectors.a_href('/menus/menu-items')
    actions.click(selector)
  }

  clickMenuGroups() {
    const selector: string = selectors.a_href('/menus/menu-groups')
    actions.click(selector)
  }

  clickMenuPages() {
    const selector: string = selectors.a_href('/menus/menus')
    actions.click(selector)
  }

  click_sales_categories() {
    const selector: string = selectors.a_href('/menus/sales-categories')
    actions.click(selector)
  }

  clickTaxes() {
    const selector: string = selectors.a_href('/menus/taxes')
    actions.click(selector)
  }

  clickSaveButton() {
    const saveButton = selectors.button_dataCY('saveButton')
    actions.click(`${saveButton} or @data-cy="save"]`)

    // Ensure that we see success message pop up
    actions.awaitElement(`//div[contains(@class, "MuiSnackbar")]//p[contains(text()," has been added") or contains(text()," has been saved") or contains(text(),"has been created")]`, 10000)
  }

  inputName(text: string) {
    const selector: string = selectors.input_name('name')
    actions.input(selector, text)
  }

  tempInputPrice(price: number) {
    const selector: string = selectors.input_id('MenuItemForm-price')
    actions.input(selector, price.toString())
  }

  // Discount Actions

  inputDiscountValue(value: number) {
    const selector: string = selectors.input_id('DiscountForm-dollarAmount')
    actions.input(selector, value.toString())
  }
  // #endregion

  // #region Existence
  // Verifications
  /**
   * This function will search the list of entities on an entity page and verify that it exists
   * Assumes you are already on the entity page (ie. https://admin.touchbistro.com/menus/printers)
   * @param text - The text that we want to find
   */
  verifyEntityTextExists(text: string) {
    it('Verify entities text matches after sync', () => {
      actions.awaitElement(selectors.a_href_contains('/create'), VAFWaitTimeout)
      return actions.awaitElement(`(//tr[@data-cy="table-row"] | //div[@data-cy="drag-list"])//div[text()="${text}"]`, VAFWaitTimeout)
    })
  }

  /**
   * This function will search the list of menu items on the menu item page and verify that it exists
   * Assumes you are already on the menu items page (ie. https://admin.touchbistro.com/menus/menu-items)
   * @param text The name of the menu item that we want to find
   */
  verifyMenuItemTextExists(text: string) {
    it('Verify menu item text values match after sync', () => {
      actions.awaitElement(selectors.a_href_contains('/create'), VAFWaitTimeout)
      return actions.awaitElement(`(//tr[@data-cy="table-row"] | //div[@data-cy="drag-list"])//span[text()="${text} "]`, VAFWaitTimeout)
    })
  }

  /**
   * Verifies the data provided in voidReason matches the data displayed on VAF
   * Assumes that the void reason details page is already displayed
   * @param voidReason Void Reason to verify
   */
  verifyVoidReason(voidReason: VoidReason) {
    it('Verify void reasons match after sync', () => {
      const voidFormName: string = selectors.input_id('VoidForm-name')
      const taxable: string = selectors.input_id('taxable')
      const returnsInventory: string = selectors.input_id('returnsInventory')
      const currentName: string = actions.find(voidFormName).getAttribute('value')
      const currentTaxable: string = selectors.find(`${taxable}[@type="checkbox"]`).getAttribute('value')
      const currentReturnsInventory: string = selectors.find(`${returnsInventory}[@type="checkbox"]`).getAttribute('value')

      expect(currentName).toEqual(voidReason.getName())
      expect(currentTaxable).toEqual(voidReason.isTaxable().toString())
      expect(currentReturnsInventory).toEqual(voidReason.isReturnsInventory().toString())
    })
  }

  verifyMenuCategory(menuCategory: MenuCategory) {
    it('Verify menu category match after sync', () => {
      const currentName: string = actions.get_value_of_text_field('Name')
      const currentSalesCategory: string = actions.get_current_select_multi_option_by_label('Sales Category')
      const currentDefaultTaxes: Array<string> = actions.get_all_current_select_multi_options_by_label('Default Taxes')
      const currentDefaultPrinters: Array<string> = actions.get_all_current_select_multi_options_by_label('Default Printer')
      const currentDefaultCourse: string = actions.get_current_select_multi_option_by_label('Default Course')

      // TODO: Default Color, Icon

      expect(currentName).toEqual(menuCategory.getName())
      expect(currentSalesCategory).toEqual(menuCategory.getSalesCategory())
      expect(currentDefaultCourse).toEqual(menuCategory.getCourse())
      expect(menuCategory.getDefaultTaxes().length).toEqual(currentDefaultTaxes.length)

      menuCategory.getDefaultTaxes().forEach((element) => {
        expect(currentDefaultTaxes).toContain(`${element.getName()} ${element.getPercentage()}%`)
      })

      const listOfPrinters = menuCategory.getPrinterNames()

      if (listOfPrinters.length > 0) {
        expect(currentDefaultPrinters.length).toEqual(listOfPrinters.length)
        currentDefaultPrinters.forEach((element) => {
          expect(listOfPrinters).toContainEqual(element)
        })
      } else {
        expect(currentDefaultPrinters[0]).toEqual("Don't Print")
      }
    })
  }

  verifyDiscount(discount: Discount) {
    it('Verify discount values match after sync', () => {
    const currentName: string = actions.get_value_of_text_field('Discount Reason')
    const currentDiscountType: string = selectors.find('//span[contains(@data-cy, "discount-radio")][contains(@class, "Mui-checked")]').getAttribute('data-cy').split('-')[0]
    let currentDiscountValue = '0'
  
    if (currentDiscountType === 'percentage') {
      currentDiscountValue = selectors.find(selectors.input_id('DiscountForm-percentage')).getAttribute('value')
    } else if (currentDiscountType === 'dollar') {
      currentDiscountValue = selectors.find(selectors.input_id('DiscountForm-dollarAmount')).getAttribute('value')
    }

    const currentMenuCategories: Array<string> =actions.get_all_current_select_multi_options_by_label('Menu Categories')

    expect(currentName).toEqual(discount.getName())
    if (discount.isPercentage()) {
      expect(currentDiscountType).toEqual('percentage')
    } else {
      expect(currentDiscountType).toEqual('dollar')
    }

    expect(currentDiscountValue).toEqual(discount.getAmount().toString())
    const listOfMenuCategories = discount.getMenuCategories().map((menuCategory) => menuCategory.getName())

    if (currentMenuCategories.length > 0) {
      expect(currentMenuCategories.length).toEqual(listOfMenuCategories.length)
      listOfMenuCategories.forEach((element) => {
        expect(currentMenuCategories).toContainEqual(element)
      })
    } else {
      expect(currentMenuCategories).toHaveLength(0)
    }
  })
  }

  verifyModifierGroup(modifierGroup: ModifierGroup) {
    it('Verify modifiers group matches after sync', () => {
      actions.pause(VAF_PAGE_LOAD_STABILITY_PAUSE) // Need this slight pause to ensure we're on the right page and it's loaded
      const displayedName: string = selectors.find('//section[@id="modifierGroupName"]//label[contains(@id, "-label")][text()="Name"]/following-sibling::div/input').getAttribute('value')
      const displayedForcedModifierCount: string = selectors.find('//section[@id="modifierGroupName"]//label[contains(@id, "-label")][text()="Default Forced Modifier Count"]/following-sibling::div/input').getAttribute('value')
      
      // TODO: icon

      expect(displayedName).toEqual(modifierGroup.getName())
      expect(displayedForcedModifierCount).toEqual(modifierGroup.getMinimumSelections().toString())

      modifierGroup.getModifiers().forEach((element) => {
        const xpath = `//section[@id="modifiersField"]//div[@data-cy="drag-list"]//p[1][text()="${element.get_name()}"]`
        actions.awaitElement(xpath)
        actions.click(xpath)

        const drag_list: string = selectors.div_dataCY('drag-list')
        const price: string = selectors.input_name('price')
        const isRequired: string = selectors.input_id('isRequired')

        const displayedModifierPrice = actions.find(`${drag_list}//${price}`).getAttribute('value')
        expect(displayedModifierPrice).toEqual(element.getPrice().toString())
        
        const displayedMandatoryValue = selectors.find(`${drag_list}//span[@data-cy="ModifierGroupForm-mandatory-mod"]//${isRequired}`).getAttribute('value')
        expect(displayedMandatoryValue).toEqual(element.isMandatory().toString())

        // Collapse the modifier
        actions.click(selectors.button_dataCY('closeSubForms'))
        actions.awaitDisappeared(selectors.button_dataCY('closeSubForm'))
      })
    })
  }

  verifyMenuPage(menuPage: MenuPage) {
    it('Verify menu page matches expected menu categories', () => {
      actions.pause(VAF_PAGE_LOAD_STABILITY_PAUSE) // We need this short pause to stabilize the test

      const displayedName: string = actions.get_value_of_text_field('Name')
      const displayedEnabled: Array<string> = actions.get_all_current_select_multi_options_by_label('Enable Menu Page')
      const displayedMenuCategoriesElements: Array<WebdriverIO.Element> = actions.find_all(`//section[@id="menuGroups"]//div[@data-cy="drag-list"]//p`)
      const displayedMenuCategories: Array<string> = Array<string>()

      displayedMenuCategoriesElements.forEach((element) => {
        displayedMenuCategories.push(element.getText())
      })
      expect(displayedName).toEqual(menuPage.getName())

      const expectedMenuCategoriesStrings: Array<string> = Array<string>()
      menuPage.getMenuCategories().forEach((element) => {
        expectedMenuCategoriesStrings.push(element.getName())
      })
      expect(displayedMenuCategories).toEqual(expectedMenuCategoriesStrings)

      if (menuPage.isEnabled()) {
        expect(displayedEnabled).toContain(`POS`)
      } else {
        expect(displayedEnabled).not.toContain(`POS`)
      }
    })
  }

  verifyMenuItem(menuItem: MenuItem) {
    // Verify Name
    it('Verify name of the menu matches', () => {
      const displayedName: string = actions.get_value_of_text_field('Name')
      expect(displayedName).toEqual(menuItem.getName())
    })

    // Verify Price
    it('Verify menu item prices match', () => {
      const openPriceCheckbox: WebdriverIO.Element = actions.find(selectors.input_id('isOpenPrice'))
      const displayedPrice: string = actions.get_value_of_text_field('Price')

      expect(openPriceCheckbox.getAttribute('value')).toEqual(menuItem.isOpenPrice().toString())

      if (menuItem.isOpenPrice()) {
        expect(displayedPrice).toEqual('')
      } else {
        expect(displayedPrice).toEqual(menuItem.getPrice().toFixed(2))
      }
    })

    // Verify Menu Category
    it('Verify menu category name matches', () => {
      const displayedMenuCategory: string = actions.get_current_select_multi_option_by_label('Menu Category')
      expect(displayedMenuCategory).toEqual(menuItem.getMenuCategory().getName())
    })
    
    // Verify Description
    it('Verify menu description matches', () => {
      const displayedDescription: string = actions.get_value_of_text_field('Description')
      expect(displayedDescription).toEqual(menuItem.getDescription())
    })

    // Verify Short Name
    it('Verify display short name matches', () => {
      const displayedShortName: string = actions.get_value_of_text_field('Short Name')
      expect(displayedShortName).toEqual(menuItem.getShortName())
    })

    // Verify Enable Menu Item
    it('Verify Enable menu item option contains POS', () => {
      const displayedEnableMenuItemOptions: Array<string> = actions.get_all_current_select_multi_options_by_label('Enable Menu Item')

      if (menuItem.isEnabled()) {
        expect(displayedEnableMenuItemOptions).toContain('POS')
      } else {
        expect(displayedEnableMenuItemOptions).not.toContain('POS')
      }
    })

    // Verify Taxes
    it('Verify Taxes are synced', () => {
      const displayedTaxes: Array<string> = actions.get_all_current_select_multi_options_by_label('Taxes')
      const isUsingDefaultTaxes: string = selectors.find(selectors.input_id('isUsingDefaultTaxes')).getAttribute('value')

      let expectedTaxesStrings: Array<string> = new Array<string>()
      // Check if default taxes is checked
      // Based on this we should be expecting either the default taxes from the menu category
      // or the taxes specified in the menu item taxes field
      if (isUsingDefaultTaxes) {
        expectedTaxesStrings = menuItem
          .getMenuCategory()
          .getDefaultTaxes()
          .map((tax) => `${tax.getName()} (${tax.getPercentage().toFixed(2)}%)`)
      } else {
        expectedTaxesStrings = menuItem
          .getTaxes()
          .map((tax) => `${tax.getName()} (${tax.getPercentage().toFixed(2)}%)`)
      }

      expect(displayedTaxes.length).toEqual(expectedTaxesStrings.length)
      expectedTaxesStrings.forEach((element) => {
        expect(displayedTaxes).toContain(element)
      })
    })

    // Verify Printers
    it('Verify printer are displayed after sync', () => {
      const displayedPrinters: Array<string> = actions.get_all_current_select_multi_options_by_label('Printers')
      const isUsingDefaultPrinter: string = selectors.find(selectors.input_id('isUsingDefaultPrinter')).getAttribute('value')

      if (menuItem.getPrinters().length > 0) {
        // Printers were selected. verify each printer displays
        expect(isUsingDefaultPrinter).toEqual('false')
        expect(menuItem.getPrinters().length).toEqual(displayedPrinters.length)

        const printerStrings: Array<string> = menuItem.getPrinterNames()
        printerStrings.forEach((element) => {
          expect(displayedPrinters).toContainEqual(element)
        })
      } else {
        // Empty array. This means it's set to category default. verify checkbox is set
        expect(isUsingDefaultPrinter).toEqual('true')
        expect(displayedPrinters.length).toEqual(0)
      }
    })

    // Verify Courses
    it('Verify courses are synced', () => {
      const displayedCourse = actions.get_current_select_multi_option_by_label('Course')
      const isUsingDefaultCourse: string = selectors.find(selectors.input_id('isUsingDefaultCourse')).getAttribute('value')

      if (isUsingDefaultCourse === 'true') {
        // If it's using default, ensure that the menu category was set to default in menu item
        // and verify the course is set to the menu category default
        expect(menuItem.getCourse()).toEqual('Category Default')
        expect(displayedCourse).toEqual(menuItem.getMenuCategory().getCourse())
      } else {
        // If not set to default, verify the course specified
        expect(displayedCourse).toEqual(menuItem.getCourse())
      }
    })

    // Verify Sales Category
    it('Verify Sales category match', () => {
      const displayedSalesCategory = actions.get_current_select_multi_option_by_label('Sales Category')
      expect(displayedSalesCategory).toEqual(menuItem.getSalesCategory())
    })
    // TODO: default sales category checkbox

    // Verify Cost
    it('Verify cost is equal to expected cost', () => {
      const displayedCost: string = actions.get_value_of_text_field('Cost')
      expect(displayedCost).toEqual(menuItem.getCost().toString())
    })
  
    // Verify UPC
    it('Verify menu item get UPC equal UPC value', () => {
      const displayedUPC: string = actions.get_value_of_text_field('UPC')
      expect(displayedUPC).toEqual(menuItem.getUPC())
    })

    // Verify Allows Returns
    it('Verify returns are allowed', () => {
      const allowsReturnsCheckbox: WebdriverIO.Element = actions.find(selectors.input_id('isReturnable'))
      expect(allowsReturnsCheckbox.getAttribute('value')).toEqual(menuItem.isAllowedReturns().toString())
    })
    
    // Verify Requires Manager Approval
    it('Verify manager approval checkbox is required', () => {
      const managerApprovalCheckbox: WebdriverIO.Element = actions.find(selectors.input_id('isManagerApprovalRequired'))
      expect(managerApprovalCheckbox.getAttribute('value')).toEqual(menuItem.isManagerApprovalRequired().toString())
    })

    // Verify Gift Card
    const giftCardCheckbox: WebdriverIO.Element = actions.find(selectors.input_id('isGiftCard'))
    
    it('Verify gift card value to equal expected value', () => {
      expect(giftCardCheckbox.getAttribute('value')).toEqual(menuItem.isGiftCard().toString())
    })
    
    // Verify Modifier Groups
    const dragList: string = selectors.div_dataCY('drag-list')
    const listOfDisplayedModifierGroups: Array<WebdriverIO.Element> = actions.find_all(`${dragList}//p[1]`)
    const listOfDisplayedModifierGroupForcedMods: Array<WebdriverIO.Element> = actions.find_all(`${dragList}//p[2]`)
    let listOfDisplayedModifierGroupsStrings: Array<string> = new Array<string>()
    let listOfDisplayedModifierGroupForcedModStrings: Array<string> = new Array<string>()
    let listOfExpectedModifierGroupsStrings: Array<string> = new Array<string>()

    // Convert elements to array of strings
    listOfDisplayedModifierGroupsStrings = listOfDisplayedModifierGroups.map(
      (displayedModifierGroup) => displayedModifierGroup.getText()
    )

    listOfDisplayedModifierGroupForcedModStrings = listOfDisplayedModifierGroupForcedMods.map(
      (displayedModifierGroupForcedMod) => displayedModifierGroupForcedMod.getText()
    )

    listOfExpectedModifierGroupsStrings = menuItem.getModifierGroups().map((modifierGroup) => modifierGroup[0].getName())

      // Verify the list of modifier group strings to strict equal. this will also verify order
    it('Verify the list of modifier group strings to strict equal. this will also verify order', () => {
      expect(listOfExpectedModifierGroupsStrings).toStrictEqual(listOfDisplayedModifierGroupsStrings)
    })

    // Verify the forced mod
    menuItem.getModifierGroups().forEach((element) => {
      it('Assert force mod count to equal forced mod string', () => {
        expect(`Forced Mod Count: ${element[1].toString()}`).toEqual(
          listOfDisplayedModifierGroupForcedModStrings[
            listOfDisplayedModifierGroupsStrings.indexOf(element[0].getName())
          ]
        )
      })
    })
  }
  // #endregion
}
