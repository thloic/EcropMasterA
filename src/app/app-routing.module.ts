import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListProducteurComponent } from './pages/list-producteur/list-producteur.component';
import { ListCultureComponent } from './pages/list-culture/list-culture.component';
import { ListParcelleComponent } from './pages/list-parcelle/list-parcelle.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'producteur',
        component: ListProducteurComponent
      },

      {
         path: 'culture',
        component: ListCultureComponent
      },
      {
        path: 'parcelle',
        component: ListParcelleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
