import { ThisReceiver } from '@angular/compiler';
import { Component,ViewChild,AfterViewInit, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './srevices/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'finalform';
  displayedColumns: string[] = ['id','date','productname', 'category', 'freshness1', 'price','Comment','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api:ApiService) {}
  ngOnInit(): void {
    this.getAllproducts();
  }
  
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllproducts();
      }
    })
  }
  
getAllproducts(){
  this.api.getProduct()
  .subscribe({
    next:(res)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    error:(err)=>{
      alert("Error while frtching the records!")
    }
  })
}
editproduct(row:any){
this.dialog.open(DialogComponent,{
  width:'30%',
  data:row
}).afterClosed().subscribe(val=>{
  if(val==='update'){
    this.getAllproducts();
  }
})
}
deleteproduct(id:number){
  this.api.deletProduct(id)
  .subscribe({
    next:(res)=>{
    alert("product Deleted successfully");
    this.getAllproducts();
  },
  error:()=>{
    alert("Error while deleting the product")
  }
  })

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
