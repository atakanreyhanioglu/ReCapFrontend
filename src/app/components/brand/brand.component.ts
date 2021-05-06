import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  currentBrand!: Brand;
  brands: Brand[]=[];
  button:boolean = false;
  filterText = '';

  constructor(private brandService:BrandService) { }


  ngOnInit(): void { this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      
    });

  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand= brand;
    this.button=false;
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand && this.button == false) {
      return 'list-group-item list-group-item-warning'
    } else {  
      return 'list-group-item';
    }
  }
  setTrueButton (){
     this.button=true;
    
  }
}