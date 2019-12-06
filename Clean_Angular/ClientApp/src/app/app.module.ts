import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AdminAfishaComponent } from './admin-afisha/admin-afisha.component';
import { AfishaComponent } from './afisha/afisha.component';
import { MultiDatePickerComponent } from './multi-date-picker/multi-date-picker.component';
import { AdminAfishaScheduleComponent } from './admin-afisha-schedule/admin-afisha-schedule.component';
import { TheatricaleventDetailsComponent } from './theatricalevent-details/theatricalevent-details.component';
import { TicketPurchaseComponent } from './ticket-purchase/ticket-purchase.component';


@NgModule({
  declarations: [
      AppComponent,
      NavMenuComponent,
      JwPaginationComponent,
      HomeComponent,
      FetchDataComponent,
      AdminAfishaComponent,
      AfishaComponent,
      MultiDatePickerComponent,
      AdminAfishaScheduleComponent,
      TheatricaleventDetailsComponent,
      TicketPurchaseComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      BrowserAnimationsModule,
      NgxMaterialTimepickerModule,
      Ng2ImgMaxModule,
      NgbModule,
      HttpClientModule,
      FormsModule,
      ApiAuthorizationModule,
      RouterModule.forRoot([
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
          { path: 'admin-afisha', component: AdminAfishaComponent, canActivate: [AuthorizeGuard], data: {permittedRoles: ["Administrator"]} },
          { path: 'admin-afisha/schedule/:id', component: AdminAfishaScheduleComponent },
          { path: 'afisha', component: AfishaComponent },
          { path: 'afisha/:id', component: TheatricaleventDetailsComponent },
          { path: 'ticket-purchase/:id', component: TicketPurchaseComponent },
      ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
