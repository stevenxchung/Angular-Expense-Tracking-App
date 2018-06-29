import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TrendsComponent } from './trends/trends.component';
import { SummaryComponent } from './summary/summary.component';

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
  {
    path: 'summary',
    component: SummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
