import { Component, inject, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TogglePasswordComponent } from '@splix/shared/ui/toggle-password';
import { Router } from '@angular/router';
import { SignUpStore } from '@splix/sign-up/data-access';

/**
 * ^                                        Match the beginning of the string <br />
 * (?=.*\d)                                 Require that at least one digit appear anywhere in the string <br />
 * (?=.*[a-z])                              Require that at least one lowercase letter appear anywhere in the string <br />
 * (?=.*[A-Z])                              Require that at least one uppercase letter appear anywhere in the string <br />
 * (?=.*[a-zA-Z])                           Require that at least one special character appear anywhere in the string <br />
 * .{8,}                                    The password must be at least 8 characters long <br />
 */
const PASSWORD_PATTERN = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

@Component({
  selector: 'splix-feature',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, IonItem, IonInput, TogglePasswordComponent, IonLabel, IonButton],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly signUpStore: SignUpStore = inject(SignUpStore);

  readonly INVALID_PASSWORD_MESSAGE = 'Password must be at least 8 length with one ' +
    'uppercase letter, one lowercase letter, one digit and one special character.';
  signUpForm: FormGroup = new FormGroup({});
  errMessage: string | null = null;

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.pattern(PASSWORD_PATTERN)]),
      name: this.fb.control('', [Validators.required, Validators.min(1)])
    });
  }

  signUp(): void {
    this.signUpStore.signUp$.next({
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      options: {
        data: {
          name: this.signUpForm.get('name')?.value
        }
      }
    });
  }

  signIn(): void {
    this.router.navigate(['sign-in']).then();
  }
}
