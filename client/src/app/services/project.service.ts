import { Injectable } from '@angular/core';
import { Project } from '../entites/project';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private BASE_URL: string = 'http://localhost:8081/projects';

  constructor(private http: Http) { }


  getStatistic(): Observable<any> {
    return this.http.get(this.BASE_URL + '/getStatistic').pipe(
      map(res => {
        return res.json();
      }));
  }

  addProject(project) {
    return this.http.post(this.BASE_URL + '/addProject', project).pipe(map((res: Response) => {
      var response = res.json();
      return response;
    }));
  }

  updateProject(project) {
    return this.http.post(this.BASE_URL + '/update', project).pipe(map((res: Response) => {
      var response = res.json();
      return response;
    }));
  }

  donate(donation, project, name) {
    return this.http.post(this.BASE_URL + '/donate', { name: project.name, donatorName: name, sum: donation }).pipe(map((res: Response) => {
      var response = res.json();
      return response;
    }));
  }

  getProject(email: string): Observable<Project> {
    var project = null;
    var headers = new Headers();
    headers.append('email', email);
    this.http.get(this.BASE_URL + '/getProject/', { headers: headers })
      .pipe(map(res => {
        project = <Project>res.json();
      }));
    return project;
  }

  getAllProjects(): Observable<any[]> {
    return this.http.get(this.BASE_URL + '/projectsList').pipe(
      map(res => {
        return res.json().map(project => {
          return new Project(
            project.name,
            project.description,
            project.managerEmail,
            project.donators,
            project.target,
            project.sum,
            project.dateOfTarget,
            project.video
          );
        });
      })
    );
  }

}
