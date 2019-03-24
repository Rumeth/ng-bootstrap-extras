import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbxModule } from 'ng-bootstrap-extras';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { NgbxdConfirmationModule } from './components/confirmation/confirmation.module';
import { DefaultComponent } from './default';
import { GettingStarted } from './getting-started';
import { NgbxdSharedModule } from './shared';

const DEMOS = [
  NgbxdConfirmationModule
];

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    GettingStarted
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    NgbxModule,
    NgbxdSharedModule,
    ...DEMOS
  ],
  bootstrap: [AppComponent]
})
export class NgbxdModule {
}
