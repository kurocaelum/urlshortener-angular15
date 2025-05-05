import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){}

  // TODO logica de login (comparar username e senha)
  public onSubmit() {
    if(this.formAuth.valid){
      this.authService.login({
        username: this.formAuth.value.username,
        password: this.formAuth.value.password
      }).subscribe({
        next: res => res,
        error: e => (this.msgError = e)
      })
      
      // this.router.navigate(['/dashboard'])
    }
  }

}
