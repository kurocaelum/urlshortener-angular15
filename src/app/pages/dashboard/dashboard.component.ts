import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username!: string

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken()
  }

}
