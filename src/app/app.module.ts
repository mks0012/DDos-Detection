import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent // Ensure DashboardComponent is declared here
  ],
  imports: [
    BrowserModule // Only BrowserModule is needed
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
