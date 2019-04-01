import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../entites/project';
import { ProjectService } from '../../services/project.service'
import { Observable, Subject, throwError} from 'rxjs';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  private msg ='';
  @Input() userName;
  private projectForm : FormGroup;
  private loading: boolean = false;
  private projects: any[];
  @Input() shownProject;
  @Input() public parentData;
  @Input() parentDataTime;
  @Input() donators;
  private howMuchLeft;
  private imgURL='';

  constructor(   
    private validationService : ValidationService ,
     private formBuilder : FormBuilder , 
     private projectService : ProjectService) { }
  
  ngOnInit() {
   this.projectService.getAllProjects().subscribe(data => {
    this.projects = data
    this.buildForm();
   });
  }

  calLeft(){
    var date1 = new Date(this.shownProject.dateOfTarget);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    this.howMuchLeft = diffDays;
    return this.howMuchLeft
  }

  getPerc() : string{
    var temp = ((this.shownProject.sum / this.shownProject.target)*100);
    return  ''+temp;
  }

  getDonators() :string {
    return this.shownProject.donators.toString();

  }

  getImgURL(project){
    return 'http://localhost:8081/images/images/'+project.managerEmail;
  }

  onProjectClick(project){
    this.shownProject = project;
    this.calLeft();
  }

  private buildForm() {
    this.projectForm = this.formBuilder.group({
      donation: ''
    });
  }

  onDonate(){
    if(!this.validationService.validateDonation(this.projectForm.value.donation).success){
      this.msg=this.validationService.validateDonation(this.projectForm.value.donation).msg;
      return false;
    }
    this.msg='';
    this.projectService.donate(this.projectForm.value.donation , this.shownProject , this.userName).subscribe(data => {
      this.shownProject = data.project;
    });
  }

}