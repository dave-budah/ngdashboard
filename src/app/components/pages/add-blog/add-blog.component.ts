import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../core/services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Blog} from "../../../core/models/blog";
import {PostsService} from "../../../core/services/posts.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  permalink:string = '';
  imgSrc: any = './assets/images/placeholder.jpg';
  selectedImg: any;
  categories: any = [];
  postForm!: FormGroup;
  post: any;
  formStatus: string = 'Create New';
  docId: string;
  submitted = false;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(val => {

      this.docId = val['id'];

      if (this.docId) {
        this.postService.loadSinglePost(val['id']).subscribe(post => {
          this.post = post;
          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(6)]],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            thumbnail: [Validators.required],
            content: [this.post.content,Validators.required]
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Update';
        });
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(6)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          thumbnail: ['',Validators.required],
          content: ['']
        });
      }
    });

  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe(val => {
        this.categories = val;
    });
  }


  get fc() {
    return this.postForm.controls;
  }
  onTitleChange({$event}: { $event: any }) {
    const title = $event.target.value;
     this.permalink = title.replace(/\s/g, '-');

  }

  previewImg($event: Event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target!.result
    }
    // @ts-ignore
    reader.readAsDataURL($event.target.files[0]);
    // @ts-ignore
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid){
      return;
    }
    let splitted = this.postForm.value.category.split('-');

    const postData: Blog = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdOn: new Date()
    }

    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/images/placeholder.jpg';
  }

}
