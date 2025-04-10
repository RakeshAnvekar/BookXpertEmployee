export interface IStateRepository {
    getAllStates(): Promise<IState[] | null>;
  }