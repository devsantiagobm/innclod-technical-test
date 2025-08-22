import { AuthService } from '@/core/services/auth/auth.service';
import { ProjectsService } from '@/core/services/projects/projects.service';
import { fadeInAnimation } from '@/shared/animations/fade-in.animation';
import { Project } from '@/shared/models/project.model';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrl: './projects-list.component.scss',
    animations: [fadeInAnimation({})]
})
export class ProjectsListComponent implements OnInit {
    private authService = inject(AuthService)
    private projectsService = inject(ProjectsService)
    private formBuilder = inject(FormBuilder)
    private router = inject(Router)

    public isLoading = false;
    public isLoadingRequest = false;
    public projects: Project[] = []

    // THIS PROPERTY IS THE ONE WHO MANAGE WHAT FORM IS SHOWN. WHEN ITS NULL NO FORM IS SHOWN
    // WHEN ITS TRUE THE CREATE PROJECT FORM IS SHOWN
    // WHEN ITS NUMBER, THAT ITS AN ID, THE UPDATE FORM IS SHOWN
    public formState: null | true | number = null;
    public deletingProjectId: number | null = null;


    form = this.formBuilder.group({
        title: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        website: ["", [Validators.required]],
        phone: ["", [Validators.required]],
    })


    ngOnInit(): void {
        this.loadProjects();
    }

    get userEmail() {
        return this.authService.getEmail()
    }

    get shouldShowForm() {
        return this.formState != null
    }

    get shouldShowDeleteModal() {
        return Boolean(this.deletingProjectId)
    }

    get isUpdatingProject() {
        return typeof this.formState === "number"
    }

    get formTexts() {
        return this.isUpdatingProject
            ? {
                title: "Actualizar proyecto",
                description: "Edita la información del proyecto y guarda los cambios realizados",
            }
            : {
                title: "Nuevo proyecto",
                description: "Completa el siguiente formulario para registrar un nuevo proyecto con su información básica",
            };
    }


    public setFormState(formstate: null | true | number) {
        this.formState = formstate;

        // Resetear formulario
        if (formstate === null || formstate === true) {
            this.form.reset();
            return;
        }

        // Editar proyecto
        const projectToUpdate = this.projects.find(({ id }) => id === formstate);
        if (projectToUpdate) {
            const { name: title, email, phone, website } = projectToUpdate;
            this.form.patchValue({ title, email, phone, website });
        }
    }

    public setDeletingProjectId(deletingProjectId: number | null) {
        this.deletingProjectId = deletingProjectId
    }

    private loadProjects(): void {
        this.isLoading = true;
        this.projectsService.getProjects().subscribe({
            next: (projects) => { this.projects = projects; },
            error: (err) => { toast.error('Error cargando los proyectos'); },
            complete: () => { this.isLoading = false; },
        });
    }

    public saveProject() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoadingRequest = true
        const projectData = this.form.value as Partial<Project>
        const toastId = toast.loading(this.isUpdatingProject ? "Actualizando proyecto..." : "Creando proyecto...");

        const request = this.isUpdatingProject
            ? this.projectsService.patchProject(this.formState as number, projectData)
            : this.projectsService.createProject(projectData);

        request.subscribe({
            next: () => {
                toast.success(this.isUpdatingProject ? "Proyecto actualizado con éxito" : "Proyecto creado con éxito");
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

    public deleteProject() {
        if (!this.deletingProjectId) { return }

        this.isLoadingRequest = true
        const toastId = toast.loading("Eliminando proyecto...");

        this.projectsService.deleteProject(this.deletingProjectId as number).subscribe({
            next: () => {
                toast.success("Proyecto eliminado con éxito");
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
