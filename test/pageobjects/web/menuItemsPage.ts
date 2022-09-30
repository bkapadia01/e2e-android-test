import { Actions } from '../../helpers/web/actions'
import { Page } from '../../helpers/web/webPage'

const actions = new Actions()

export class MenuItemsPage extends Page {

    getMenuItemText(row: number) {        
        return actions.get_iframe_column_text(row)
    }
}
