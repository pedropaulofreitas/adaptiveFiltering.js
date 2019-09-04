import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSelectComponent } from './app-select/app-select.component';

const routes: Routes = [
 {
   path: 'appSelect',
   component: AppSelectComponent
 },
 {
   path: 'o',
   loadChildren:'./applications/applications.module#ApplicationsModule'
 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
