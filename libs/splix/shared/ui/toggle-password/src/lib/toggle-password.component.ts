import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'as-toggle-password',
  templateUrl: './toggle-password.component.html',
  styleUrls: ['./toggle-password.component.scss'],
  imports: [
    IonIcon,
  ],
  standalone: true
})
export class TogglePasswordComponent implements AfterContentInit {

  @ContentChild(HTMLElement) input!: HTMLElement;

  showPassword: boolean = false;

  constructor() {
    addIcons({eyeOffOutline, eyeOutline})
  }

  ngAfterContentInit() {
    console.log(this.input);
  }

  toggleShow(): void {
    this.showPassword = !this.showPassword;
    (this.input as unknown as IonInput).type = this.showPassword ? 'text' : 'password';
  }
}
