import { Injectable } from '@angular/core';
import { Http , Response , RequestOptions , Headers } from '@angular/http'; 
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountService {

    private user : any;
    private token : string;

    private BASE_URL : string = 'http://localhost:8081/users';
    private isLoggedIn = false;

    constructor(private http:Http){}

    getProfile(){
        this.token = localStorage.getItem('auth_token');
        let options = new RequestOptions({
          headers: new Headers({
            'Content-Type': 'application/json', // Format set to JSON
            'authorization': this.token // Attach token
          })
        });
        return this.http.get(this.BASE_URL + '/profile', options).pipe(map(res => res.json()));
    }

    register(user){
        return this.http.post(this.BASE_URL + '/register' , user).pipe(map((res : Response) => {
            var response = res.json();
            return response;
        }));
    }

    login(email : string , password : string) : Observable<any> {
        return this.http.post(this.BASE_URL + '/login' , {email : email , password : password})
            .pipe(map((res : Response) => {
                var result = res.json();
                this.isLoggedIn = result.success;
                return { status : res.status , data : result};
            }))
    }

    logout() : void {
        this.isLoggedIn = false;
    }

    ifLoggedIn() : boolean {
        return this.isLoggedIn;
    }

}