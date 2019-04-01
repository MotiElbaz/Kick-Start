import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name = 'home';
  private successProjects = 0;
  private projects = 0;

  BASE_URL: string = 'http://localhost:8081/projects/';

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getStatistic().subscribe(data => {
      if(data.success){
        this.successProjects = data.statistic.success;
        this.projects = data.statistic.projects;
      }
    });
  }

}
