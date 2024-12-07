import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit{
  postForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | undefined | null = null  ;
  postId : string | undefined | null = null;


  constructor(
    private fb: FormBuilder,
     private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(140)]]
    });
  }
  ngOnInit(): void {}
  onImageSelected(event: any) {
    const file: File = event.target.files[0];

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG images are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File size should not exceed 2MB');
      return;
    }

    this.postService.uploadImage(file).subscribe({
      next: (response) => {
        debugger;
        console.log(response)
        this.imagePreview =  response.body.imageUrl;
        this.postId = response.body.postId;
      },
      error: (error) => {
        console.error('Image upload failed', error);
      }
    });
  }
  removeImage() {
    this.selectedImage = null;
    this.imagePreview = null;
  }
  onSubmit() {
    if (this.postForm.valid) {
      const formData = new FormData();

      formData.append('content', this.postForm.get('content')?.value);

      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }

      let data = {
        "id": this.postId ?? '',
        "content": this.postForm.get('content')?.value,
        "image": this.imagePreview
      }
      this.postService.createPost(data).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/posts/']);
        },
        error: (error) => {
          console.error('Post creation failed', error);
        }
      });
    }
  }
  get remainingChars() {
    const content = this.postForm.get('content')?.value || '';
    return 140 - content.length;
  }
}
