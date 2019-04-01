import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private accountService : AccountService , private router : Router) { }

  ngOnInit() {
    localStorage.removeItem('auth_token');
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

}
