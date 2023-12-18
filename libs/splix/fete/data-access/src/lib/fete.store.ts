import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { supabase } from '@splix/shared/app-config';
import { ToastUtil } from '@splix/shared/util';
import { ToastController } from '@ionic/angular';

export type Fete = {
  id: string;
  paidAt: Date;
  paidBy: string;
  restaurantName: string;
  snacks: string[];
};

type FeteState = {
  loaded: boolean;
  error: string | null;
  fetes: Fete[];
};

export type SaveFete = Omit<Fete, 'id'>
export type DeleteFete = Fete['id'];

@Injectable()
export class FeteStore {

  private readonly toastController = inject(ToastController);
  private state: WritableSignal<FeteState> = signal({
    loaded: true,
    error: null,
    fetes: []
  });

  loaded: Signal<boolean> = computed(() => this.state().loaded);
  error: Signal<string | null> = computed(() => this.state().error);
  fetes: Signal<Fete[]> = computed(() => this.state().fetes);

  save$: Subject<SaveFete> = new Subject();
  update$: Subject<Fete> = new Subject();
  delete$: Subject<DeleteFete> = new Subject();

  constructor() {
  }

  private handleSaveEvent(): void {
    this.save$.pipe(
      takeUntilDestroyed(),
      switchMap((fete: SaveFete) => {
        return supabase.from('fete').insert(fete);
      })
    ).subscribe({
      next: () => ToastUtil.open('Fete has been saved', this.toastController),
      error: err => {
        console.error(err);
        this.state.update((state: FeteState) => ({ ...state, error: err }));
      }
    });
  }
}
