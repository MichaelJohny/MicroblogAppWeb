import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://localhost:7293/api/posts'

  constructor(private http: HttpClient) {}

  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/create`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'response'
    });
  }

}
