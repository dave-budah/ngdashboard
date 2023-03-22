import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../../core/services/posts.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postArray: any = [];
  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
    });
  }

  onDelete(postImgPath: any, id) {
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id, value) {
    const featuredData = {
        isFeatured: value
    }
    this.postService.markFeatured(id, featuredData);
  }
}
