import { Given, When, Then } from '@wdio/cucumber-framework'
import { AdminHomePage } from '../../pageobjects/web/adminHomePage'
import { AdminLoginPage } from '../../pageobjects/web/adminLoginPage'
import { ManagePage } from '../../pageobjects/web/managePage'

const managePage = new ManagePage()
const adminLoginPage = new AdminLoginPage()
const adminHomePage = new AdminHomePage()

// Given Steps:

Given('I am on Manage Page', (): void => {
  managePage.openManage()
})

// When Steps:

When('I login into venue admin portal with credentials with {string} and password {string}', (username, password): void => {
  const venueUsername = process.env[username]
  const venuePassword = process.env[password]

  adminLoginPage.openAdmin()
  adminLoginPage.loginWithCredentials(venueUsername, venuePassword)

  browser.pause(3000) // takes few seconds for page to reload twice and alert to appear
})

When('I unlink license with venue id {string}', (venueId): void => {
  const venueID = process.env[venueId]

    // Web - Unlink account
    managePage.loginWithCredentials()
    managePage.openRestaurant(venueID)
    managePage.unlinkLicense()
})

// Then Steps:

Then('I see I am logged into admin portal', (): void => {
  expect(adminHomePage.verifyUserLoggedIn()).toBeTruthy()
})