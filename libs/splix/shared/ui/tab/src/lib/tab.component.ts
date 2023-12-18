import { Component, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { supabase } from '@splix/shared/app-config';
import {
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonLabel,
  IonMenu,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { AuthStore } from '@splix/auth/data-access';
import { NgIf } from '@angular/common';
import { homeOutline, personOutline, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'as-tab',
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    NgIf,
    IonIcon
  ],
  templateUrl: './tab.component.html'
})
export class TabComponent {

  private readonly router: Router = inject(Router);
  private readonly menuCtrl: MenuController = inject(MenuController);
  protected authStore: AuthStore = inject(AuthStore);

  constructor() {
    addIcons({homeOutline, personOutline, logOutOutline})
  }

  openMenu(): void {
    // this.menuCtrl.open('more-menu').then();
    this.menuCtrl.enable(true, 'more-menu')
      .then((): Promise<void> => this.menuCtrl.open('more-menu').then());
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut().then((): void => {
      this.router.navigate(['signin']).then();
    });
  }
}
