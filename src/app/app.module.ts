import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ScheduleModule,
    CalendarModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    GridModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
