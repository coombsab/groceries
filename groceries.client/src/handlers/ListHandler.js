import { socketService } from "../services/SocketService";

export class ListHandler {
  static getList() {
    socketService.emit("GET_LIST")
  }

  static getHistory() {
    socketService.emit("GET_HISTORY")
  }

  static addItem(itemId) {
    socketService.emit("ADD_ITEM", itemId)
  }

  static removeItem(itemId) {
    socketService.emit("REMOVE_ITEM", itemId)
  }

  static deleteItem(itemId) {
    socketService.emit("DELETE_ITEM", itemId)
  }

  static editItem(itemId) {
    socketService.emit("EDIT_ITEM", itemId)
  }

  static toggleIsItemChecked(itemId) {
    socketService.emit("TOGGLE_CHECKED", itemId)
  }
}