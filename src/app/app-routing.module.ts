import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'feedbacks', loadChildren: () => import('@/app/pages/feedback-page/feedback.module').then(m => m.FeedbackModule) },
  // { path: 'roadmap', loadChildren: () => import('@/app/pages/roadmap-page/roadmap.module').then(m => m.RoadmapModule) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
