export class Item {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.creatorId = data.creatorId
    this.textColor = data.textColor
    this.bgColor = data.bgColor
    this.inUse = data.inUse
    this.isChecked = data.isChecked
    this.creator = data.creator
  }
}