import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ExpensesComponent } from './expenses/expenses.component';

// This is where the URL routes will be
const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
