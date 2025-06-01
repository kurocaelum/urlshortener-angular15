import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username!: string
  user: User | any
  msgError!: string

  public formInsert: FormGroup = this.formBuilder.group({
    identifier: ['', Validators.required],
    url: ['', Validators.required]
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  public onInsert() {
    if(this.formInsert.valid) {
      this.authService.insertUrl({
        identifier: this.formInsert.value.identifier,
        urlOriginal: this.formInsert.value.url,
        userId: this.user.id
      }).subscribe({
        next: res => res,
        error: e => (this.msgError = e)
      })
    }
  }

  public logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken()
    this.authService.findUser(this.username).subscribe(res => this.user = res)
  }

  public isUrlsEmpty(): boolean {
    return this.user.urls.length === 0
  }
  
}
