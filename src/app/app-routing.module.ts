import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSelectComponent } from './app-select/app-select.component'; 

const routes: Routes = [
 { path: 'appSelect', component: AppSelectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
