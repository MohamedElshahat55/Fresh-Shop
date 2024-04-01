import { Component } from '@angular/core';
import { BrandsService } from '../../Services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { IBrand } from '../../Interface/brand';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
})
export class BrandDetailsComponent {
  constructor(
    private _BrandsService: BrandsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  //VARIABLES
  brandId: string = '';
  specificBrand: IBrand = {} as IBrand;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id') as string;
      },
    });

    // HANDLE API METHOD
    this._BrandsService.getBrandsById(this.brandId).subscribe({
      next: (res) => {
        this.specificBrand = res.data;
      },
    });
  }
}
