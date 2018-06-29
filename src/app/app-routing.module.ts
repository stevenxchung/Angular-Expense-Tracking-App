import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TrendsComponent } from './trends/trends.component';

// This is where the URL routes will be
const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'trends',
    component: TrendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
