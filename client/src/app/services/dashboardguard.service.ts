import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot , RouterStateSnapshot , Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable()
export class DashboardGuard implements CanActivate {

    constructor(private accountService : AccountService , private router : Router){}

    canActivate() {
        if(this.accountService.ifLoggedIn()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}