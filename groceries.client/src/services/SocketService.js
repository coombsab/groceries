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
      .on("ADD_ITEM", this.addItem)
      .on("REMOVE_ITEM", this.removeItem)
      .on("DELETE_ITEM", this.deleteItem)
      .on("EDIT_ITEM", this.editItem)
  }

  setList(items) {
    AppState.items = items
  }

  setHistory(itemsHistorical) {
    AppState.itemsHistorical = itemsHistorical
  }

  addItem(item) {
    if (item.inUse) {
      AppState.items.push(item)
    } else {
      AppState.itemsHistorical.push(item)
    }
  }

  removeItem(item) {
    AppState.items = AppState.items.filter(i => i.id === item.id)
  }

  deleteItem(item) {
    AppState.items = AppState.items.filter(i => i.id === item.id)
    AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id === item.id)
  }

  editItem(item) {
    let itemIndex = AppState.items.indexOf(item)
    if (itemIndex >= 0) {
      AppState.activeItem = item
      AppState.items.splice(itemIndex, 1, AppState.activeItem)
    } else {
      itemIndex = AppState.itemsHistorical.indexOf(item)
      AppState.activeItem = item
      AppState.itemsHistorical.splice(newItemIndex, 1, AppState.activeItem)
    }
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
