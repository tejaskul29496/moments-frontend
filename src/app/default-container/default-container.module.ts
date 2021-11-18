import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { DefaultContainerComponent } from './default-container.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';
import { MomentsModule } from '../moments/moments.module';
import {MatMenuModule} from '@angular/material/menu';


const routes: Routes = [
  {
    path: '',
    component: DefaultContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'moments',
        loadChildren: () => import('../moments/moments.module').then(m => m.MomentsModule)
      }
    ]
  }
]


@NgModule({
  declarations: [DefaultContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DashboardModule,
    MatListModule,
    MatExpansionModule,
    MatRippleModule,
    MomentsModule,
    MatMenuModule
  ]
})
export class DefaultContainerModule { }
