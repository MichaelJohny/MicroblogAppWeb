import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {DatePipe} from "../../../shared/pipes/date.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PostService} from "../../services/post.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    DatePipe,
    NgbModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];
  page: number = 1;
  isLoading: boolean = false;

  constructor(
     private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (newPosts) => {
        this.posts = [...this.posts, ...newPosts];
        this.page++;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load posts', error);
        this.isLoading = false;
      }
    });
  }

  likePost(postId: string) {
    console.log("like post ++")
  }
}
