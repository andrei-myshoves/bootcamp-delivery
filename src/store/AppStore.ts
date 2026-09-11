import { makeAutoObservable } from 'mobx'
export class AppStore {
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(value: boolean) {
        this.isLoading = value
    }
}
