import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './public/guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren:() => import('./public/public.module').then(p => p.PublicModule)},
  { path: '', loadChildren: () => import('./private/private.module').then(p => p.PrivateModule), canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
