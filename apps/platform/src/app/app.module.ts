import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavButtonComponent } from './navbar/nav-button/nav-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule, LinkModule } from '@frontend-v2/shared-ui';
import { FooterComponent } from './footer/footer.component';
import { SeoService } from './seo.service';
import { BeemstreamLogoComponent } from './beemstream-logo/beemstream-logo.component';
import { BuyMeACoffeeComponent } from './buy-me-a-coffee/buy-me-a-coffee.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavButtonComponent,
    FooterComponent,
    BeemstreamLogoComponent,
    BuyMeACoffeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    LinkModule,
    IconModule,
  ],
  providers: [SeoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
