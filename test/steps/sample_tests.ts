/* eslint-disable jest/no-standalone-expect */
import { Given, When, Then } from '@wdio/cucumber-framework'
import { SplashScreen } from '../pageobjects/mobile/splashScreen'

const splashScreen = new SplashScreen()


When('I click on Get Started and enter device code',(): void => {
  splashScreen.tapGetStarted()
  .tapConnectWithDeviceCode()
  .enterDeviceCode()
  .tapSignIn()
})
