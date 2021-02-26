import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavButtonComponent } from './navbar/nav-button/nav-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkModule } from '@frontend-v2/shared-ui';
import { FooterComponent } from './footer/footer.component';
import { SeoService } from './seo.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavButtonComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    LinkModule,
  ],
  providers: [SeoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
