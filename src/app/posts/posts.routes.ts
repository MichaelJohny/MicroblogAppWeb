import { Routes } from "@angular/router";
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {PostListComponent} from "./components/post-list/post-list.component";
import {authGuard} from "../core/guards/auth.guard";


export const POSTS_ROUTES: Routes = [
    {
        path: 'create',
        component: CreatePostComponent,
        canActivate : [authGuard]
    },
    {
        path: '',
        component: PostListComponent,
      canActivate : [authGuard]
    }
];
