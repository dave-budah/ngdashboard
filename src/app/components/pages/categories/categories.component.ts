import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../core/services/categories.service";
import {NgForm} from "@angular/forms";
import {Category} from "../../../core/models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryArray: any =  [];
  categoryEdit!: string;
  formStatus: string = 'Add';
  categoryId!: string;

  constructor(private categoriesService: CategoriesService) {
  }
  ngOnInit(): void {
    this.categoriesService.loadData().subscribe( val => {
      console.log(val);
      this.categoryArray = val;
    })
  }
  onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add') {
      this.categoriesService.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoriesService.updateData(this.categoryId, categoryData)
      formData.reset();
      this.formStatus = 'Add';
    }
  }


  onEdit(category: string, id: string) {
    this.categoryEdit = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any) {
    this.categoriesService.deleteData(id);
  }
}
