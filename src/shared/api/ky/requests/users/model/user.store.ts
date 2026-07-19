import { makeAutoObservable } from 'mobx'
import type { User } from '@/shared/api/ky/requests/users/types/user.types'

class UserStore {
    user: User | null = null
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: User | null) {
        this.user = user
    }

    setLoading(value: boolean) {
        this.isLoading = value
    }
}

export const userStore = new UserStore()
