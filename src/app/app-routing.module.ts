import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'supervisor-main', loadChildren: './pages/supervisor-main/supervisor-main.module#SupervisorMainPageModule' },
  { path: 'operario-main', loadChildren: './pages/operario-main/operario-main.module#OperarioMainPageModule' },  { path: 'supervisor-tasks', loadChildren: './pages/supervisor-tasks/supervisor-tasks.module#SupervisorTasksPageModule' },
  { path: 'supervisor-geotasks', loadChildren: './pages/supervisor-geotasks/supervisor-geotasks.module#SupervisorGeotasksPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
