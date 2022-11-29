import { AppState } from "../AppState"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on("GET_LIST", this.setList)
      .on("GET_HISTORY", this.setHistory)
      .on("GET_ITEM", this.setActiveItem)
  }

  setList(items) {
    AppState.items = items
  }

  setHistory(itemsHistorical) {
    AppState.itemsHistorical = itemsHistorical
  }

  setActiveItem(item) {
    AppState.activeItem = item
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
