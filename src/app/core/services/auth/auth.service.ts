import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    public login(email: string, _password: string): Observable<boolean> {
        return of(true).pipe(
            delay(2000),
            tap(success => {
                if (success) {
                    localStorage.setItem("session", JSON.stringify({ email }));
                }
            })
        );
    }
}
