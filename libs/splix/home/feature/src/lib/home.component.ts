import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { TogglePasswordComponent } from '@splix/shared/ui/toggle-password';

@Component({
  selector: 'splix-home',
  standalone: true,
  imports: [CommonModule, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar, ReactiveFormsModule, TogglePasswordComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
