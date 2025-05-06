import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formAuth: FormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  public msgError!: string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){}

  public onSubmit() {
    if(this.formAuth.valid){
      this.authService.login({
        username: this.formAuth.value.username,
        password: this.formAuth.value.password
      }).subscribe({
        next: res => res,
        error: e => (this.msgError = e)
      })
    }
  }

}
