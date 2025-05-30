import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username!: string
  user!: User

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken()
    this.authService.findUser(this.username).subscribe(res => this.user = res)
  }

}
