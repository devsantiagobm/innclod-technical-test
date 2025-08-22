import { Task } from '@/shared/models/task.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient)
  private readonly baseUrl = environment.JSON_PLACEHOLDER_URL;

  public getTasksByProjectId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/users/${id}/todos`);
  }

  public createTask(Task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/todos`, Task);
  }

  public patchTask(id: number, partial: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/todos/${id}`, partial);
  }

  public deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/todos/${id}`);
  }
}
