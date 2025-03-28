import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from '../../app/core/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule,
        
    ],
    templateUrl: './category-list.component.html',
    styleUrls:[ './category-list.component.scss']
})
export class CategoryListComponent implements OnInit{

    dataSource = new MatTableDataSource<Category>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(
      private categoryService: CategoryService,
      public dialog: MatDialog,
    ) { 
      
    }
    createCategory() {    
      const dialogRef = this.dialog.open(CategoryEditComponent, {
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });    
    }  

    ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
          categories => this.dataSource.data = categories
      );

  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  deleteCategory(category: Category) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar categoría", description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  

}
