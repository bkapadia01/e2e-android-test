import { Actions } from '../../helpers/mobile/actions'
import { Selectors } from '../../helpers/mobile/selectors'
import { Screen } from './Screen'

const actions = new Actions()
const selectors = new Selectors()

export class SplashScreen extends Screen {
 
  // Interactions

  tapGetStarted() {
    actions.awaitTapButtonContainsName('Get Started')
    return this
  }

  tapConnectWithDeviceCode() {
    actions.awaitTapButtonContainsName('Connect With Device Code')
    return this
  }
  
  tapSignIn() {
    actions.awaitTapButtonContainsName('Sign In')
  }

  enterDeviceCode() {
    const deviceCode = '12345678'
    const arrValue = [...deviceCode] // This is for converting string to charArray
    for(let i = 0 ; i < arrValue.length; i += 1) {
      const deviceCodeTextfield = selectors.textFieldWithIndex(i)
      actions.awaitType(deviceCodeTextfield, arrValue[i])
    }
    return this
  }  
}
