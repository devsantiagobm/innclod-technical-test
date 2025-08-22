import { AuthService } from '@/core/services/auth/auth.service';
import { ProjectsService } from '@/core/services/projects/projects.service';
import { TasksService } from '@/core/services/tasks/tasks.service';
import { fadeInAnimation } from '@/shared/animations/fade-in.animation';
import { Project } from '@/shared/models/project.model';
import { Task } from '@/shared/models/task.model';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { forkJoin, switchMap } from 'rxjs';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrl: './tasks-list.component.scss',
    animations: [fadeInAnimation({})]
})
export class TasksListComponent implements OnInit {
    private taskService = inject(TasksService)
    private projectsService = inject(ProjectsService)
    private authService = inject(AuthService)
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder)

    public isLoading = false;
    public isLoadingRequest = false;
    public tasks: Task[] = []
    public project: null | Project = null;
    // THIS PROPERTY IS THE ONE WHO MANAGE WHAT FORM IS SHOWN. WHEN ITS NULL NO FORM IS SHOWN
    // WHEN ITS TRUE THE CREATE PROJECT FORM IS SHOWN
    // WHEN ITS NUMBER, THAT ITS AN ID, THE UPDATE FORM IS SHOWN
    public formState: null | true | number = null;
    public deletingTaskId: number | null = null;

    form = this.formBuilder.group({
        title: ["", [Validators.required]],
    })


    get tasksStats() {
        return { length: this.tasks.length, completed: this.tasks.filter(({ completed }) => completed).length }
    }

    get shouldShowForm() {
        return this.formState != null
    }

    get shouldShowDeleteModal() {
        return Boolean(this.deletingTaskId)
    }


    get isUpdatingTask() {
        return typeof this.formState === "number"
    }

    get formTexts() {
        return this.isUpdatingTask
            ? {
                title: "Actualizar tarea",
                description: "Edita la información de la tarea y guarda los cambios realizados",
            }
            : {
                title: "Nueva tarea",
                description: "Completa el siguiente formulario para registrar una nueva tarea con su información básica",
            };
    }

    ngOnInit(): void {
        this.loadData();
    }

    public setDeletingProjectId(projectId: number | null) {
        this.deletingTaskId = projectId
    }

    public setFormState(formstate: null | true | number) {
        this.formState = formstate;

        // Resetear formulario
        if (formstate === null || formstate === true) {
            this.form.reset();
            return;
        }

        // Editar tarea
        const taskToUpdate = this.tasks.find(({ id }) => id === formstate);
        if (taskToUpdate) {
            const { title } = taskToUpdate;
            this.form.patchValue({ title });
        }
    }


    private loadData(): void {
        this.isLoading = true;

        this.route.paramMap
            .pipe(
                switchMap(params => {
                    const projectId = Number(params.get('projectId'));
                    return forkJoin({
                        project: this.projectsService.getProjectById(projectId),
                        tasks: this.taskService.getTasksByProjectId(projectId)
                    });
                })
            )
            .subscribe({
                next: ({ project, tasks }) => {
                    this.project = project;
                    this.tasks = tasks;
                    this.isLoading = false
                },
                error: () => toast.error('Error cargando la información del proyecto')
            });
    }

    public deleteTask() {
        if (!this.deletingTaskId) { return }

        this.isLoadingRequest = true
        const toastId = toast.loading("Eliminando tarea...");

        this.taskService.deleteTask(this.deletingTaskId as number).subscribe({
            next: () => {
                toast.success("Tarea eliminada con éxito");
                this.setDeletingProjectId(null)
            },
            error: (err) => {
                toast.error(err.message || "Ocurrió un error. Inténtalo de nuevo.");
            },
            complete: () => {
                toast.dismiss(toastId);
                this.isLoadingRequest = false;
            }
        });
    }

    public saveTask() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoadingRequest = true
        const projectData = this.form.value as Partial<Task>
        const toastId = toast.loading(this.isUpdatingTask ? "Actualizando tarea..." : "Creando tarea...");

        const request = this.isUpdatingTask
            ? this.taskService.patchTask(this.formState as number, projectData)
            : this.taskService.createTask(projectData);

        request.subscribe({
            next: () => {
                toast.success(this.isUpdatingTask ? "Tarea actualizada con éxito" : "Tarea creada con éxito");
                this.setFormState(null)
            },
            error: (err) => {
                toast.error(err.message || "Ocurrió un error. Inténtalo de nuevo.");
            },
            complete: () => {
                toast.dismiss(toastId);
                this.isLoadingRequest = false;
            }
        });
    }

    public logout() {
        const toastId = toast.loading('Cerrando sesión...');

        this.authService.logout().subscribe({
            next: (res) => {
                this.router.navigate(['auth/login'])
            },
            error: (err) => {
                toast.error(err.message || 'Error al cerrar sesión. Inténtalo de nuevo');
            },
            complete: () => {
                toast.dismiss(toastId);
                this.isLoadingRequest = false
            },
        })
    }

}
