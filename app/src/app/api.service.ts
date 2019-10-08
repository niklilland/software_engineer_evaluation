import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users } from './data/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Authenticate sign-in with dummy data
  authenticate(req) {
    return users[0].email === req.email && users[0].password == req.password
  }

  getImages(term) {
    return this.http.get(`https://images-api.nasa.gov/search?media_type=image&q=${term}`)
  }
}
