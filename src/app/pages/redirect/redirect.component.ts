import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  urlShortened: string
  urlObj!: {
    id: number,
    identifier: string,
    urlOriginal: string,
    urlShortened: string,
    date: string
  }

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.urlShortened = this.route.snapshot.params['urlShortened']
  }

  ngOnInit(): void {
    this.authService.findUrlByShort(this.urlShortened).subscribe(
      res => {
        this.urlObj = res
        window.location.href = this.urlObj.urlOriginal
      },
      error => {
        window.location.href = 'http://localhost:4200/404'
      }
    )
  }

}
