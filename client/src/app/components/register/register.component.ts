import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup} from '@angular/forms';
import { User } from '../../entites/user';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm : FormGroup;
  private msg : string = '';

  constructor(
    private validationService : ValidationService ,
    private formBuilder : FormBuilder , 
    private accountService : AccountService , 
    private router : Router) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      permission:''
    });
  }

  onRegister(){
    var permissionTemp = '';
    if(this.registerForm.value.permission == 'Donator'){
      permissionTemp = 'donator';
    }else if(this.registerForm.value.permission != ''){
      permissionTemp = 'pm';
    }
    let user = new User(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      permissionTemp
    );
    if(!this.validationService.validateRegister(user).success){
      this.msg=this.validationService.validateRegister(user).msg;
      return false;
    }
    this.msg='';
    this.accountService.register(user).subscribe(res => {
      if(res.success){
        setTimeout(() => {

          this.router.navigate(['login']);
        } , 1000);
      }else{

      }
    });
  }

}
