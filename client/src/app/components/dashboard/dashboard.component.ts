import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { ProjectService } from '../../services/project.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from '../../entites/project';
import { ValidationService } from '../../services/validation.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private projectForm: FormGroup;
  private flag: boolean = false;
  public permission: string;
  public pmProject: Project;
  private isPm: boolean;
  public howMuchTimeLeft;
  public donators: string;
  public userName;
  private userEmail;
  private msg = '';
  private BASE_URL: string = 'http://localhost:8081/images';
  private isImageUploaded = false;

  constructor(
    private http: Http,
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private projectService: ProjectService,

  ) { }

  private selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit() {
    this.accountService.getProfile().subscribe(
      res => {
        this.flag = true;
        this.permission = res.permission;
        if (this.permission == 'donator') {
          this.userName = res.user.name;
        }
        if (this.permission == 'pm') {
          this.userEmail = res.user.email;
          if (res.project) {
            this.pmProject = <Project>res.project;
          } else {
            this.pmProject = null;
          }
          this.isPm = true;
          this.buildForm();
        }
      }
    );
  }

  private buildForm() {
    var name;
    var description;
    var email;
    var target;
    var video;
    var date1;
    if (this.pmProject) {
      name = this.pmProject.name;
      description = this.pmProject.description;
      email = this.pmProject.managerEmail;
      target = this.pmProject.target;
      video = this.pmProject.video;
      date1 = new Date(this.pmProject.dateOfTarget);
      var date2 = new Date();
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.howMuchTimeLeft = diffDays;
      var dd = date1.getDate();
      var mm = date1.getMonth() + 1; //January is 0!

      var yyyy = date1.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today = dd + '/' + mm + '/' + yyyy;
      date1 = today;
    } else {
      name = '';
      description = '';
      email = this.userEmail;
      target = '';
      video = '';
    }
    this.projectForm = this.formBuilder.group({
      name: name,
      description: description,
      managerEmail: email,
      target: target,
      dateOfTarget: '',
      video: video
    });

  }

  onSumbit() {
    var flag = false;
    var email;
    var target;
    var array = [];
    var sum = 0;
    var date;
    if (!this.pmProject) {
      email = this.projectForm.value.managerEmail;
    } else {
      email = this.pmProject.managerEmail;
      array = this.pmProject.donators;
      sum = this.pmProject.sum;
      flag = true;
      if (this.projectForm.value.dateOfTarget == undefined) {
        date = this.pmProject.dateOfTarget;
      }
    }
    let project = new Project(
      this.projectForm.value.name,
      this.projectForm.value.description,
      this.userEmail,
      array,
      this.projectForm.value.target,
      sum,
      this.projectForm.value.dateOfTarget,
      this.projectForm.value.video
    );
    if (!this.validationService.validateProject(project).success) {
      this.msg = this.validationService.validateProject(project).msg;
      return false;
    }
    this.msg = '';
    if (!this.isImageUploaded) {
      this.msg = 'Upload image!';
      return false;
    }

    if (this.pmProject) {
      this.projectService.updateProject(project).subscribe(res => {
        if (res.success) {
          console.log(project)
          this.pmProject = project;
        }
      });
    } else {
      this.projectService.addProject(project).subscribe(res => {
        if (res.success) {
          this.pmProject = project;
        }
      });
    }
  }

  onUpload() {
    var formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('managerEmail', this.userEmail);
    this.http.post(this.BASE_URL + '/upload', formData)
      .subscribe(data => {
        this.isImageUploaded = true;
      });
  }

}
