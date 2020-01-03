import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService,) { }

  ngOnInit() {
    this.auth.localAuthSetup(); // may need to move to an implementaion of OnInit()

  }

}
