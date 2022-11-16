export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture || "https://forum.truckersmp.com/uploads/monthly_2020_03/imported-photo-202022.thumb.png.81943bfe1be32614be2b23043e189bd5.png"
    // TODO add additional properties if needed
    this.coverImg = data.coverImg || "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
  }
}
