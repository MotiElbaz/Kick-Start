import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm : FormGroup;
  private errMsg : string = '';

  constructor(
    private formBuilder : FormBuilder , private accountService : AccountService , private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onLogin() : void {
    this.accountService.login(this.loginForm.value.email , this.loginForm.value.password).subscribe(
      res => {
        if(res.data.success){
          localStorage.setItem('auth_token' , res.data.token);
          this.router.navigate(['dashboard']);
        } else {
          this.errMsg = 'No such account';
        }
      } , 
      error => {
        this.errMsg = error.message;
      }
    )
  }

}
