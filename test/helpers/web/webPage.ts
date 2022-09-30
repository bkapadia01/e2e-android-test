/**
 * contains all shared functionality across web pages
 */

const DEFAULT_STABILITY_PAUSE = parseInt(process.env.DEFAULT_STABILITY_PAUSE, 10)

export class Page {
  isLocalhost: boolean = process.env.ENVIRONMENT === 'localhost'

  open(url: string) {
    return webDriver.url(url)
  }

  openAdmin(param?: string) {
    return this.open(this.getAdminBaseURL(param))
  }

  openManage(param?: string) {
    return this.open(this.getManageBaseURL(param))
  }

  openTBDine(param?: string) {
    return this.open(this.getTBDineURL(param))
  }

  openCWA(param?: string) {
    return this.open(this.getCWAURL(param))
  }

  refreshPage() {
    webDriver.refresh()
  }

  pause(timeout = DEFAULT_STABILITY_PAUSE) {
    // eslint-disable-next-line no-console
    console.log(`Waiting for ${timeout.toString()} milliseconds...`)
    webDriver.pause(timeout)
  }

  acceptAlert() {
    webDriver.acceptAlert()
  }

  // Private

  private getAdminBaseURL(param?: string) {
    const url = this.isLocalhost ? 'http://localhost:9002' : 'https://admin.touchbistro.com'
    if (param) {
      return url + param
    }
    return url
  }

  private getManageBaseURL(param?: string) {
    const url = this.isLocalhost ? 'http://localhost:9000' : 'https://manage.touchbistro.com'
    if (param) {
      return url + param
    }
    return url
  }

  private getTBDineURL(venueID?: string) {
    const url = 'https://order.tbdine.com/pickup/'
    if (venueID) {
      const menuEndpoint = '/menu'
      return url + venueID + menuEndpoint
    }
    return url
  }

  private getCWAURL(venueID?: string) {
    const url = 'https://app.tableup.com/r/'
    if (venueID) {
      const homeEndpoint = '/home'
      return url + venueID + homeEndpoint
    }
    return url
  }
}
