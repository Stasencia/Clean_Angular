import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AdminAfishaComponent } from './admin-afisha/admin-afisha.component';
import { AfishaComponent } from './afisha/afisha.component';


@NgModule({
  declarations: [
      AppComponent,
      NavMenuComponent,
      JwPaginationComponent,
      HomeComponent,
      CounterComponent,
      FetchDataComponent,
      AdminAfishaComponent,
      AfishaComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      Ng2ImgMaxModule,
      HttpClientModule,
      FormsModule,
      ApiAuthorizationModule,
      RouterModule.forRoot([
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'counter', component: CounterComponent },
          { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
          { path: 'admin-afisha', component: AdminAfishaComponent, canActivate: [AuthorizeGuard] },
          { path: 'afisha', component: AfishaComponent, canActivate: [AuthorizeGuard] },
      ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
