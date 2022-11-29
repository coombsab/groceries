import { AppState } from "../AppState"
import { Item } from "../models/Item"
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
      .on("TOGGLE_CHECKED", this.toggleChecked)
  }

  setList(items) {
    AppState.items = items
  }

  setHistory(itemsHistorical) {
    AppState.itemsHistorical = itemsHistorical
  }

  addItem(returnItem) {
    const item = new Item(returnItem)
    Pop.toast(`${item.name} has been added to the list`, "success", "bottom")
    const itemIndex = AppState.items.findIndex(i => i.id === item.id)
    const historyIndex = AppState.itemsHistorical.findIndex(i => i.id === item.id)
    if (item.inUse) {
      if (itemIndex < 0) {
        AppState.items.push(item)
        AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id !== item.id)
      }
    } else  {
      if (historyIndex < 0) {
        AppState.itemsHistorical.push(item)
        AppState.items = AppState.items.filter(i => i.id !== item.id)

      }
    }
  }

  removeItem(returnItem) {
    const item = new Item(returnItem)
    Pop.toast(`${item.name} has been removed from the active list`, "success", "bottom")
    AppState.items = AppState.items.filter(i => i.id !== item.id)
    const historyIndex = AppState.itemsHistorical.findIndex(i => i.id === item.id)
    if (historyIndex < 0) {
      AppState.itemsHistorical.push(item)
    }
  }

  deleteItem(item) {
    Pop.toast(`${item.name} has been deleted`, "success", "bottom")
    AppState.items = AppState.items.filter(i => i.id !== item.id)
    AppState.itemsHistorical = AppState.itemsHistorical.filter(i => i.id !== item.id)
  }

  editItem(returnItem) {
    const item = new Item(returnItem)
    let itemIndex = AppState.items.findIndex(i => i.id === item.id)
    if (itemIndex >= 0) {
      AppState.activeItem = item
      AppState.items.splice(itemIndex, 1, AppState.activeItem)
    } else {
      itemIndex = AppState.itemsHistorical.indexOf(item)
      AppState.activeItem = item
      AppState.itemsHistorical.splice(newItemIndex, 1, AppState.activeItem)
    }
  }

  toggleChecked(returnItem) {
    this.editItem(returnItem)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
