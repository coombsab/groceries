import { socketService } from "../services/SocketService";

export class ListHandler {
  static getList() {
    socketService.emit("GET_LIST")
  }

  static getHistory() {
    socketService.emit("GET_HISTORY")
  }

  static getItemById(itemId) {
    socketService.emit("GET_ITEM", itemId)
  }
}