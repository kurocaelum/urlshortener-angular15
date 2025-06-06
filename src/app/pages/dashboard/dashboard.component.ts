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
  editUrl: boolean[] = []
  msgError!: string

  public formInsert: FormGroup = this.formBuilder.group({
    identifier: ['', Validators.required],
    url: ['', Validators.required]
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken()
    this.authService.findUser(this.username).subscribe(res => {
      this.user = res
      for(let i=0; i < this.user.urls.length; i++)
        this.editUrl.push(false)
    })
  }

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

  public isUrlsEmpty(): boolean {
    return this.user.urls.length === 0
  }

  public deleteUrl(id: number) {
    console.log("URL ID: " + id)
    this.authService.deleteUrl(id).subscribe({
      next: res => res,
      error: e => (this.msgError = e)
    })
  }

  public cancelEditUrl(id: number, index: number) {
    this.authService.findUrl(id).subscribe(
      res => {
        this.user.urls[index] = res
      }
    )
    this.toggleEditUrl(index)
  }

  public updateUrl(index: number) {
    this.authService.updateUrl(this.user.urls[index]).subscribe({
      next: res => res,
      error: e => (this.msgError = e)
    })
  }
  
  public toggleEditUrl(index: number) {
    this.editUrl[index] = !this.editUrl[index]
  }

}
