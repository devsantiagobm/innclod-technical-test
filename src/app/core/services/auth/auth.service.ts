import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private sessionKey = "session"

    public login(email: string, _password: string): Observable<boolean> {
        return of(true).pipe(
            delay(2000),
            tap(success => {
                if (success) {
                    localStorage.setItem(this.sessionKey, JSON.stringify({ email }));
                }
            })
        );
    }

    public getEmail(): string | null {
        const session = localStorage.getItem(this.sessionKey);
        return session ? JSON.parse(session).email : null;
    }

    public logout(): Observable<boolean> {
        return of(true).pipe(
            delay(2000),
            tap(success => {
                if (success) {
                    localStorage.removeItem(this.sessionKey);
                }
            })
        );
    }
}
