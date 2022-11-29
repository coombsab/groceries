import { itemsService } from "../services/ItemsService";
import { logger } from "../utils/Logger";
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
        .on("ADD_ITEM", this.addItem)
        .on("REMOVE_ITEM", this.removeItem)
        .on("DELETE_ITEM", this.deleteItem)
        .on("EDIT_ITEM", this.editItem)
        .on("TOGGLE_CHECKED", this.toggleChecked)
    }

    async getList() {
      const list = await itemsService.getItems({ inUse: true })
      this.io.emit("GET_LIST", list)
    }

    async getHistory() {
      const history = await itemsService.getItems({ inUse: false })
      this.io.emit("GET_HISTORY", history)
    }

    async addItem(itemId) {
      const item = await itemsService.getItemById(itemId)
      this.io.emit("ADD_ITEM", item)
    }

    async removeItem(itemId) {
      logger.log("Server ListHandler is removing an item!")
      const item = await itemsService.getItemById(itemId)
      this.io.emit("REMOVE_ITEM", item)
    }

    async deleteItem(itemId) {
      logger.log("Server ListHandler is deleting an item!")
      const item = await itemsService.getItemById(itemId)
      this.io.emit("DELETE_ITEM", item)
    }

    async editItem(itemId) {
      const item = await itemsService.getItemById(itemId)
      this.io.emit("EDIT_ITEM", item)
    }

    async toggleChecked(itemId) {
      const item = await itemsService.getItemById(itemId)
      this.io.emit("TOGGLE_CHECKED", item)
    }
}