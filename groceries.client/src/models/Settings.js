export class Settings {
  constructor(data) {
    this.id = data.id || data._id
    this.accountId = data.accountId
    this.textColor = data.textColor
    this.bgColor = data.bgColor
    this.theme = data.theme
    this.coverImg = data.coverImg
  }
}