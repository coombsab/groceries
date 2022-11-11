import { Auth0Provider } from "@bcwdev/auth0provider";
import { itemsService } from "../services/ItemsService";
import BaseController from "../utils/BaseController";

export class ItemsController extends BaseController {
  constructor() {
    super("api/items");
    this.router
      .get("", this.getItems)
      .get("/:itemId", this.getItemById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addItem)
      .put("/:itemId/toggleInUse", this.toggleInUse)
      .put("", this.removeInUseItems)
      .put("/:itemId", this.editItem)
      .delete("/:itemId", this.deleteItem)
  }
  async getItems(req, res, next) {
    try {
      const items = await itemsService.getItems(req.query);
      res.send(items);
    }
    catch (error) {
      next(error)
    }
  }

  async getItemById(req, res, next) {
    try {
      const item = await itemsService.getItemById(req.params.itemId);
      res.send(item);
    }
    catch (error) {
      next(error)
    }
  }

  async addItem(req, res, next) {
    try {
      const item = await itemsService.addItem(req.body, req.userInfo);
      res.send(item);
    }
    catch (error) {
      next(error)
    }
  }

  async toggleInUse(req, res, next) {
    try {
      const item = await itemsService.toggleInUse(req.params.itemId);
      res.send(item);
    }
    catch (error) {
      next(error)
    }
  }

  async removeInUseItems(req, res, next) {
    try {
      const itemsReport = await itemsService.removeInUseItems(req.body);
      res.send(itemsReport);
    }
    catch(error) {
      next(error)
    }
  }

  async editItem(req, res, next) {
    try {
      req.body.id = req.params.itemId;
      const item = await itemsService.editItem(req.body, req.userInfo);
      res.send(item);
    }
    catch (error) {
      next(error)
    }
  }

  async deleteItem(req, res, next) {
    try {
      const item = await itemsService.deleteItem(req.params.itemId);
      res.send(item);
    }
    catch (error) {
      next(error)
    }
  }
}