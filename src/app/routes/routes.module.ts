import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArraySortPipe} from '../services/orderBy';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GamePageComponent
  }
];


@NgModule({
  declarations: [
    LandingPageComponent,
    GamePageComponent,
    ArraySortPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [RouterModule],
  providers: [DatePipe, ArraySortPipe]
})
export class RoutesModule { }
