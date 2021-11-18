import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentsService } from '../moments.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss']
})
export class AddMomentComponent implements OnInit {

  tags: Array<string> = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fileUploadQueue: FileList[] = [];
  fileArr: any = []
  fileObj: any = [];
  progress: number = 0;
  momentsForm: FormGroup

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private momentsService: MomentsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.momentsForm = this.fb.group({
      title: new FormControl('', Validators.required),
      tags: new FormControl([], Validators.required),
      documents: new FormControl([], Validators.required)
    })
  }

  add(event: MatChipInputEvent) {

    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push(value);
      this.momentsForm.controls['tags'].setValue(this.tags);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(data: any) {
    const index = this.tags.indexOf(data);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.momentsForm.controls['tags'].setValue(this.tags);
    }
  }

  upload(e: any) {
    let fileListAsArray: any[] = [];
    fileListAsArray = e ? Array.from(e) : Array.from(e.target.files);
    fileListAsArray.forEach(item => {
      // let files = e ? e : e.target.files;
      const url = URL.createObjectURL(item);
      this.fileArr.push({ item, url: url, progress: 0 });
    })

    this.fileArr.forEach((item: any) => {
      this.fileUploadQueue.push(item.item)
    })

    this.uploadFiles(this.fileUploadQueue);

    
  }

  uploadFiles(files: any) {
    this.spinner.show()
    this.momentsService.fileUpload(files).subscribe((event: HttpEvent<any>) => {
      // console.log(response.docFiles);
      this.spinner.hide()
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / Number(event.total) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.momentsForm.controls['documents'].setValue(event.body.docFiles[0].fileLink);
          console.log(this.momentsForm.value);
      }
    })
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSizeInMB(sizeInBytes: any) {
    if (sizeInBytes == 0) return '0 Bytes';
    var k = 1000,
      dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    return parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  submitData() {
    
    this.spinner.show();
    this.momentsService.addMoment(this.momentsForm.value).subscribe((response: any) => {
      this.spinner.hide();
      this.toastr.success(response.message)
      this.router.navigate(['moments']);
    },err => {
      this.spinner.hide()
      this.toastr.error(err.error.message);
    })
  }
}
