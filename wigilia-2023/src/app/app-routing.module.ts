import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawComponent } from './draw/draw.component';
// import { authGuard } from './core/services/auth.guard';
// import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'losowanie', pathMatch: 'full' },
  { path: 'losowanie', component: DrawComponent },
  { path: '92941', component: DrawComponent },
  { path: '5fa58', component: DrawComponent },
  { path: 'd0bc8', component: DrawComponent },
  { path: '14e10', component: DrawComponent },
  { path: 'ca1db', component: DrawComponent },
  { path: '70333', component: DrawComponent },
  { path: 'c109c', component: DrawComponent },
  // { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }