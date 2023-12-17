import { from, Subject, switchMap } from 'rxjs';
import { AuthTokenResponse, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { supabase } from '@splix/shared/app-config';

interface SignInState {
  loaded: boolean;
  error: string | null;
}

@Injectable()
export class SignInStore {

  signIn$: Subject<SignInWithPasswordCredentials> = new Subject();
  private readonly router: Router = inject(Router);
  private state: WritableSignal<SignInState> = signal({
    loaded: true,
    error: null
  });
  loaded: Signal<boolean> = computed(() => this.state().loaded);
  error: Signal<string | null> = computed(() => this.state().error);

  constructor() {
    this.signIn$.pipe(
      takeUntilDestroyed(),
      switchMap((credentials: SignInWithPasswordCredentials) => {
        this.state.set({ loaded: false, error: null });
        return from(supabase.auth.signInWithPassword(credentials));
      })
    ).subscribe((response: AuthTokenResponse): void => {
      if (response.error) {
        this.state.set({ loaded: true, error: response.error?.message });
      } else {
        this.state.set({ loaded: true, error: null });
        this.router.navigate(['tab']).then();
      }
    });
  }
}
