import { Component } from '@angular/core';
import {
  IonApp, IonContent,
  IonHeader,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { TabComponent } from '@splix/shared/ui/tab';

@Component({
  standalone: true,
  imports: [IonApp, TabComponent, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
  selector: 'as-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
