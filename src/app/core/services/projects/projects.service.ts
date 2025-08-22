import { Project } from '@/shared/models/project.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient)
  private readonly baseUrl = environment.JSON_PLACEHOLDER_URL;

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/users`);
  }

  public getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/users/${id}`);
  }

  public createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/users`, project);
  }

  public patchProject(id: number, partial: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.baseUrl}/users/${id}`, partial);
  }

  public deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`${this.baseUrl}/users/${id}`);
  }
}
