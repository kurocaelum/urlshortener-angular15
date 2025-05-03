import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private formBuilder: FormBuilder){}

  // TODO logica de login (comparar username e senha)
  public onSubmit() {
    if(this.formAuth.valid)
      this.router.navigate(['/dashboard'])
  }

}
