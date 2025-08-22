import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagesPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Correo electrónico inválido';
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;

    return 'Error desconocido';
  }
}
