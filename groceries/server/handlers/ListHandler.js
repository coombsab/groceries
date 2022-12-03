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
    try {
      const list = await itemsService.getItems({ inUse: true })
      this.socket.broadcast.emit("GET_LIST", list)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }

  async getHistory() {
    try {
      const history = await itemsService.getItems({ inUse: false })
      this.socket.broadcast.emit("GET_HISTORY", history)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }

  async addItem(itemId) {
    try {
      const item = await itemsService.getItemById(itemId)
      this.socket.broadcast.emit("ADD_ITEM", item)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }

  async removeItem(itemId) {
    try {
      const item = await itemsService.getItemById(itemId)
      this.socket.broadcast.emit("REMOVE_ITEM", item)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }

  async deleteItem(itemId) {
    try {
      const item = await itemsService.getItemById(itemId)
      this.socket.broadcast.emit("DELETE_ITEM", item)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }

  async editItem(itemId) {
    try {
      const item = await itemsService.getItemById(itemId)
      this.socket.broadcast.emit("EDIT_ITEM", item)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }

  async toggleChecked(itemId) {
    try {
      const item = await itemsService.getItemById(itemId)
      this.socket.broadcast.emit("TOGGLE_CHECKED", item)
    } catch (error) {
      this.socket.emit('error', error)
    }
  }
}