import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutoCompleteService {
    private url = 'http://localhost:3000/autocomplete';

    constructor(private http: HttpClient) {}

    getAutocomplete(value: string): Observable<string[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
      
        return this.http.post<string[]>(this.url, { value }, { headers });
    }
}
