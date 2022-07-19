import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../srevices/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productForm !: FormGroup;

  constructor(private FormBuilder :FormBuilder,
     private api :ApiService,
     @Inject(MAT_DIALOG_DATA) public editData:any,
     private dialogRef:MatDialogRef<DialogComponent>) { }
     actionbtn:string="save"
freshness=["Brand new","Second hand","refurbished"];
  ngOnInit(): void {
    this.productForm =this.FormBuilder.group({
      productname :['',Validators.required],
      category :['',Validators.required],
      freshness1 :['',Validators.required],
      price : ['',Validators.required],
      Comment  :['',Validators.required],
      date :['',Validators.required],
      
     
    });
    if(this.editData)
    {
      this.actionbtn="update";
      this.productForm.controls['productname'].setValue(this.editData.productname);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness1'].setValue(this.editData.freshness1);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment );
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['id'].setValue(this.editData.id);
    }
  }
  addProduct(){
     if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.valid)
        .subscribe({
          next:(res)=>{
            alert("product added successfilly");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("error while adding the product")
          }
        })
  
        
      }
     }
      else{
        this.updateProduct()
      
      }
    }
  
  updateProduct()
  {
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
    next:(res)=>{
    alert("product added successfully");
    this.productForm.reset();
    this.dialogRef.close('update');
     },
    error:()=>
     {
     alert("error while adding the product");
         
     }
     })
     }
  }



