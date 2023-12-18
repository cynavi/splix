import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInStore } from '@splix/sign-in/data-access';
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
import { TogglePasswordComponent } from '@splix/shared/ui/toggle-password';

@Component({
  selector: 'as-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TogglePasswordComponent,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton
  ],
  providers: [SignInStore]
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup = new FormGroup({});
  protected readonly signInStore: SignInStore = inject(SignInStore);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): void {
    this.signInForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  signInWithPassword(): void {
    this.signInStore.signIn$.next({
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value
    });
  }

  signUp(): void {
    this.router.navigate(['sign-up']).then();
  }
}
