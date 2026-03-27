import { computed, Injectable, signal } from "@angular/core";
import { User } from '@org/shared';

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  //state
  readonly #user = signal<User | null>(null);
  //public readonly user signal
  readonly user = this.#user.asReadonly();

  //isLogged state
  readonly isLogged = computed(() => !!this.user());

  //actions
  setUser(user: User) {
    this.#user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  logOff() {
    this.#user.set(null);
  }
}
