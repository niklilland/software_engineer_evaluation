import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchForm;
  totalResults;
  imageName;
  imageTime;
  imagePath;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.searchForm = this.formBuilder.group({
      'search': new FormControl('jupiter', [Validators.required]),
    });
  }

  // Submit query to api service
  onSubmit(searchData) {
    // TODO: Validation
    this.apiService.getImages(searchData.search).subscribe((data) => {
      console.log(data['collection']);
      this.totalResults = data['collection'].metadata.total_hits;
      this.imagePath = data['collection'].items[0].links[0].href;
      this.imageName = data['collection'].items[0].data[0].title;
      this.imageTime = moment(data['collection'].items[0].data[0].date_created).format('ddd, D MMM YYYY HH:mm:ss Z');
    })
  }

  openDialog(dialog) {
    this.modalService.open(dialog);
  }
}
