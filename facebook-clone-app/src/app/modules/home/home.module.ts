import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './page/home.component';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, NgxMasonryModule, HomeRoutingModule],
  exports: [],
  providers: []
})
export class HomeModule {}
