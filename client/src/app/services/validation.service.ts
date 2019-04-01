import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateDonation(sum){
    if(sum == '' || sum <= 0){
      return { success : false , msg: 'Need a valid amount!' } ; 
    }
    return { success : true , msg: 'Valid donation!' } ; 
  }

  validateRegister(user){
    if(user.name == ''){
      return { success : false , msg: 'Need user name!' } ; 
    }
    if(user.email == ''){
      return { success : false , msg: 'Need email!' } ; 
    }
    if(user.password == ''){
      return { success : false , msg: 'Need password!' } ; 
    }
    if(user.permission == ''){
      return { success : false , msg: 'Need account type!' } ; 
    }
    return { success : true , msg: 'User validate!' } ; 
  }

  validateProject(project){
    if(project.name == ''){
      return { success : false , msg: 'Need project name!' } ; 
    }
    if(project.description == ''){
      return { success : false , msg: 'Need description!' } ; 
    }
    if(project.videoURL == ''){
      return { success : false , msg: 'Need video!' } ; 
    }
    if(project.dateOfTarget == undefined){
      return { success : false , msg: 'Need date to finish!' } ; 
    }else{
      var tempDate = new Date(project.dateOfTarget);
      var tempDate2 = new Date();
      var timeDiff = tempDate.getTime() - tempDate2.getTime();
      if(timeDiff <= 0) {
        return { success : false , msg: 'Need a valid date!' } ; 
      }
    }
    if(project.target == '' || project.target <= 0){
      return { success : false , msg: 'Need a valid target value!' } ; 
    }
    return { success : true , msg: 'Project validate!' } ; 
  }

}
