import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMomentComponent } from './add-moment/add-moment.component';
import { MomentsComponent } from './moments.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { DragDropFileUploadDirective } from '../helpers/file-upload.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';


const routes: Routes = [
  {
    path: '',
    component: MomentsComponent
  },
  {
    path: 'add-moment',
    component: AddMomentComponent
  }
]


@NgModule({
  declarations: [
    MomentsComponent,
    AddMomentComponent,
    DragDropFileUploadDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatPaginatorModule
  ]
})
export class MomentsModule { }
