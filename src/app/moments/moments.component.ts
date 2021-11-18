import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MomentsService } from './moments.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.scss']
})

export class MomentsComponent implements OnInit {

  displayedColumns: string[] = ['sr no', 'documents', 'title', 'tags', 'action'];
  dataSource = [];

  constructor(
    private momentsService: MomentsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMoments()
  }

  getMoments() {
    this.momentsService.getMoments().subscribe((response: any) => {
      this.dataSource = response.data;
    })
  }

  removeTag(element: any, i: number) {
    this.spinner.show();
    element.tags.splice(i, 1);
    this.momentsService.updateMoment(element).subscribe((response: any) => {
      this.spinner.hide();
      this.toastr.success(response.message);
    }, err => {
      this.toastr.error(err.error.message);
    })
  }

  deleteMoment(element: any) {
    if(confirm('Are you sure you want to delete this moment?')) {
      this.momentsService.deleteMoment(element).subscribe((response: any) => {
        this.spinner.hide();
        this.getMoments()
        this.toastr.success(response.message);
      }, err => {
        this.toastr.error(err.error.message);
      })
    }
  }

}
