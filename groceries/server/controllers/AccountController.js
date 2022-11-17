import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/settings", this.getUserSettings)
      .post("/settings", this.createUserSettings)
      .put("/settings", this.saveUserSettings)
      .put("", this.updateAccount);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserSettings(req, res, next) {
    try {
      const settings = await accountService.getUserSettings(req.userInfo);
      res.send(settings);
    }
    catch (error) {
      next(error)
    }
  }

  async createUserSettings(req, res, next) {
    try {
      const settings = await accountService.createUserSettings(req.body, req.userInfo);
      res.send(settings);
    }
    catch(error) {
      next(error)
    }
  }

  async saveUserSettings(req, res, next) {
    try {
      const settings = await accountService.saveUserSettings(req.userInfo, req.body);
      res.send(settings);
    }
    catch(error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body);
      res.send(account);
    }
    catch(error) {
      next(error)
    }
  }
}
