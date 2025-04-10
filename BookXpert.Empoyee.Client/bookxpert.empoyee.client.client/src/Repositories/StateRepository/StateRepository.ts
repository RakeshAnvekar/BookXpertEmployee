import { IState } from "../../Models/IState";
import { IStateRepository } from "./IStateRepository";

export default class StateRepository implements IStateRepository {
  async getAllStates(): Promise<IState[] | null> {
    const url = "https://localhost:7108/api/states";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        console.error(`Error fetching states: ${response.statusText}`);
        return null;
      }

      const result: IState[] = await response.json();
      return result;
    } catch (error) {
      console.error(`Exception in getAllStates: ${error}`);
      return null;
    }
  }
}
