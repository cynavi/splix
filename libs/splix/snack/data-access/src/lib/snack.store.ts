import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { supabase } from '@splix/shared/app-config';
import { ToastUtil } from '@splix/shared/util';

export type Snack = {
  id: string;
  userId: string;
  amount: number;
  name: string;
  remarks?: string;
};

type SnackState = {
  loaded: boolean;
  error: string | null;
  snacks: Snack[];
};

export type SaveSnack = Omit<Snack, 'id'>
export type DeleteSnack = Snack['id'];

@Injectable()
export class SnackStore {


  private readonly toastController = inject(ToastController);
  private state: WritableSignal<SnackState> = signal({
    loaded: true,
    error: null,
    snacks: []
  });

  loaded: Signal<boolean> = computed(() => this.state().loaded);
  error: Signal<string | null> = computed(() => this.state().error);
  snacks: Signal<Snack[]> = computed(() => this.state().snacks);

  save$: Subject<SaveSnack> = new Subject();
  update$: Subject<Snack> = new Subject();
  delete$: Subject<DeleteSnack> = new Subject();

  constructor() {
  }

  private handleSaveEvent(): void {
    this.save$.pipe(
      takeUntilDestroyed(),
      switchMap((fete: SaveSnack) => {
        return supabase.from('snack').insert(fete);
      })
    ).subscribe({
      next: () => ToastUtil.open('Snack has been saved', this.toastController),
      error: err => {
        console.error(err);
        this.state.update((state: SnackState) => ({ ...state, error: err }));
      }
    });
  }
}
