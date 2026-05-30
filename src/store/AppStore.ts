import { makeAutoObservable } from 'mobx'

class AppStore {
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(value: boolean) {
        this.isLoading = value
    }
}

export const appStore = new AppStore()
