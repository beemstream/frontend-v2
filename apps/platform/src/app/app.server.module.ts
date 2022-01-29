import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalModule } from '@ng-web-apis/universal';

@NgModule({
  imports: [AppModule, ServerModule, UniversalModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
