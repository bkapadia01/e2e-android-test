# E2E Test Automation

## Description

A test automation framework using WebdriverIO. The main purpose is to support full end-to-end integration testing between mobile and web devices.

## Setup

* [Install JDK - Java 17 - Arm 64 DMG Installer (Apple M1)](https://www.oracle.com/ca-en/java/technologies/javase-downloads.html)

## Install NVM
  * `brew install nvm`
  * `echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc (replace zshrc with your default resource script)`
  * `brew install appium`
  * Restart terminal
  * `nvm install 14.17.5`
  * `nvm use 14.17.5`

## NPM
Setup access to our [private npm repositories](https://www.npmjs.com/settings/touchbistro/packages):
1. You've signed up https://www.npmjs.com/ with the username `touchbistro-[your email username]` and enabled 2-factor auth
2. Accepted npm organization invite. Check your email or request access through `#help-devops` Slack Channel.
3. Login using `npm login` in your terminal once you have your npmjs credentials.

## Install Packages
* Run `npm install`
* `cp .env.example .env`
* update iOS version in the .env file.

Confirm the following:

``` bash
appium -v
1.22.3

npm -v
6.14.4

node -v
v14.17.5

java -version
java version "17.0.2" 2022-01-18 LTS
```

* Make a copy of `.env.example` to your own `.env` file in the root directory. Fill in the variables as needed for your setup:
	* `ENVIRONMENT`: currently supports either `production` or `localhost`
	* `MANAGE_USER` and `MANAGE_PASSWORD`: credentials for your manage user, used for unlinking licenses on Manage
	* `POS_ADMIN_PASSCODE`: passcode for your venue, which will be default to `1234`. this shouldn't change for now, but will allow for future implementation if we need to have a custom passcode for the restaurant
	* `DEVICE_UDID`(optional): the UDID of the simulator or physical device that the app will run on. you can find the UDID by running the command `xcrun simctl list` and finding your simulator in the list that displays
	* `APP_PATH`(optional): the path to the app that will be running. you will need a standalone build of the app
	* `DEVICE_NAME`(optional): the specific name of the simulator you wish to run . e.g. `iPad Pro (9.7-inch)`
	* `WDIO_SERVICE`(optional): The web service you want wdio to run. Default `selenium-standalone`. Can also use `appium`.  NOTE:  `selenium-standalone` does not work on arm mac books.

## Usage
`npm run all_tests` - this will run the all uitests.

`npm run floorplan_sync_test` - currently this will run the entire set of floorplan sync down tests.

`npm run loyalty_gift_card_test` - currently this will run the entire set of loyalty - gift card tests.

`npm run loyalty_test` - currently this will run the entire set of loyalty - rewards tests.

`npm run menu_sync_test` - currently this will run the entire set of menu sync tests.

`npm run online_order_test` - currently this will run the entire set of online ordering.

`npm run reports_test` - currently this will run the entire set of reports tests.

`npm run support_options_test` - currently this will run set of support options tests.

## Command Line Parameters
`noreset` - add this parameter when running tests to run the app as it is on the ipad (ie. `npm run amp noreset`)


## Framework Structure

### config-xxx.js
* Entry point for the automation framework. This is what is called from the script in Package.json
* Since this wdio framework uses TypeScript, the .js entrypoint is very short and calls a wdio config .ts file that has all the config details

### wdio.conf.xxx.ts
* WebDriverIO config file - details can be found in WDIO documentation

### package.json
* I use the "scripts" section to run specific automation suites. This is where the .js entrypoint is specified

### specs
* Test files are located in the specs folder

### pageobjects
* Page Objects are located in the pageobjects folder
* Currently set up so there is a generic WebPage and MobilePage class, which all other pageobjects for that respective platform inherit from
* Page Objects contain functions that call helper functions

### helpers
*  Wrappers around Selenium and Appium functions
# e2e-android-test
