import { Page } from '../../helpers/web/webPage'

export class AdminReportsPage extends Page {
  generateUrl(parent: string, child: string, query?: string) {
    if (query) {
      return `/new/reports/${parent}/${child}?${query}`
    } else {
      return `/reports/${parent}/${child}`
    }
  }

  navigateToReports(parent:string, child: string, query?: string) {
    const url = this.generateUrl(parent, child, query)
    this.openAdmin(url)
  }
}
