import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public formSignUp: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // passwordConfirm: ['', Validators.required]
  })

  public msgError!: string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public onSubmit() {
    if(this.formSignUp.valid){
      this.authService.register({
        username: this.formSignUp.value.username,
        password: this.formSignUp.value.password
      }).subscribe({
        next: res => res,
        error: e => (this.msgError = e)
      })
    }
  }

}
