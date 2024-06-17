import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  id: string;
  roomNumber: string;
  price: string;
  links: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json'; // URL to web API

  constructor(private http: HttpClient) { }

  // Fetch config and handle potential errors
  getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // Retry up to 3 times before failing
        catchError(this.handleError) // Handle errors
      );
  }

  // Fetch config with full response
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.configUrl, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // General error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
