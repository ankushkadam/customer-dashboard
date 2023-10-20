import { BehaviorSubject, Observable, distinctUntilChanged, map } from "rxjs";

export class SimmpleStore <StateType = any> {

  private stateSubject: BehaviorSubject<StateType>;

  constructor(initialState: StateType) {
    this.stateSubject = new BehaviorSubject(initialState);
  }

  public getState(): Observable<StateType> {
    return this.stateSubject.pipe(distinctUntilChanged());
  }

  public getStateSnapshot(): StateType {
    return this.stateSubject.getValue();
  }

  public select<K extends keyof StateType>(key: K): Observable<StateType[K]> {
    const selectStream = this.stateSubject.pipe(
      map((state: StateType) => {
        return state[key];
      }),
      distinctUntilChanged()
    );

    return(selectStream);
  }

  public setState(updater: any): void {
    const currentState = this.getStateSnapshot();
    const partialState = (updater instanceof Function)
    ? updater(currentState) : updater;
    const nextState = Object.assign({}, currentState, partialState);
    this.stateSubject.next(nextState);
  }

  public resetState(): void {
    this.stateSubject.next({} as any);
  }
  
}