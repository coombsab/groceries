import { itemsService } from "../services/ItemsService";
import { SocketHandler } from "../utils/SocketHandler";

export class ListHandler extends SocketHandler {
    /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
     constructor(io, socket) {
      super(io, socket)
      this
        .on('GET_LIST', this.getList)
        .on('GET_HISTORY', this.getHistory)
        .on("GET_ITEM", this.getItem)
    }

    async getList() {
      const list = await itemsService.getItems({ inUse: true })
      this.io.emit("GET_LIST", list)
    }

    async getHistory() {
      const history = await itemsService.getItems({ inUse: false })
      this.io.emit("GET_HISTORY", history)
    }

    async getItem(itemId) {
      const item = await itemsService.getItemById(itemId)
      this.io.emit("GET_ITEM", item)
    }
}