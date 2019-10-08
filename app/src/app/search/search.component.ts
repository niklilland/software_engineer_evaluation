import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchForm;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      'search': new FormControl('', [Validators.required]),
    });
  }

  // Submit query to api service
  onSubmit(searchData) {
    // TODO: Validation
    this.apiService.getImages(searchData.search).subscribe((data) => {
      console.log(data);
    })
  }

}
