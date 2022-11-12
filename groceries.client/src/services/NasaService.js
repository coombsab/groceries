import { AppState } from "../AppState";
import { Apod } from "../models/Apod";
import { nasaApi } from "./AxiosService";

class NasaService {
  async getApod() {
    const res = await nasaApi.get("", { params : { count: 1 }})
    AppState.apod = new Apod(res.data[0])
  }
}

export const nasaService = new NasaService();