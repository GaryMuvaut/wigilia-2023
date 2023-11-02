import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawComponent } from './draw/draw.component';
// import { authGuard } from './core/services/auth.guard';
// import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'losowanie', pathMatch: 'full' },
  { path: 'losowanie', component: DrawComponent },
  { path: 'losowanie/:key', component: DrawComponent }
  // { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }