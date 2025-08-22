import { AuthService } from '@/core/services/auth/auth.service';
import { fadeInAnimation } from '@/shared/animations/fade-in.animation';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';


// TODO SERVICIO GENERICO PARA LOS ERRORES HTPP
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    animations: [fadeInAnimation({})]
})
export class LoginComponent {
    private formBuilder = inject(FormBuilder)
    private authService = inject(AuthService)
    private router = inject(Router)
    public isLoadingRequest = false;

    form = this.formBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });

    public login() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        };

        this.isLoadingRequest = true
        const toastId = toast.loading('Iniciando sesión...');

        const { email, password } = this.form.value

        this.authService.login(email as string, password as string).subscribe({
            next: (res) => {
                toast.success('Login exitoso');
                this.router.navigate(['dashboard/projects'])
            },
            error: (err) => {
                toast.error(err.message || 'Error al iniciar sesión. Inténtalo de nuevo');
            },
            complete: () => {
                toast.dismiss(toastId);
                this.isLoadingRequest = false
            },
        });
    }
}
