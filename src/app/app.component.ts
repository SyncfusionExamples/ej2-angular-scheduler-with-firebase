import { Component } from '@angular/core';
import { DayService, WeekService, WorkWeekService, GroupModel, TimelineViewsService, TimelineMonthService, MonthService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule,],
  providers: [DayService, WeekService, WorkWeekService, TimelineViewsService, TimelineMonthService, MonthService, AgendaService, ResizeService, DragAndDropService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  resItems: Observable<any[]>;
  public test!: any[];
  public currentView = "Month";
  public schData = { Subject: null, StartTime: null, EndTime: null, ConferenceId: null, IsAllDay: null, Id: null, DocumentId: null };
  public group: GroupModel = { resources: ['Owners'] };
  public categoryDataSource: any;

  public allowMultiple: Boolean = true;
  public selectedDate = new Date(2019, 8, 24);

  constructor(private firestore: Firestore) {
    const resourceCollection = collection(this.firestore, 'ResourceData');
    this.resItems = collectionData(resourceCollection);
    this.resItems.subscribe(resData => {
      this.categoryDataSource = resData;
    });

    const dataCollection = collection(this.firestore, 'Data');
    this.items = collectionData(dataCollection);
    this.items.subscribe(data => {
      this.test = data;
      let schObj = (document.querySelector('.e-schedule') as any).ej2_instances[0];
      this.test.forEach(item => {
        item.StartTime = new Date(item.StartTime.seconds * 1000);
        item.EndTime = new Date(item.EndTime.seconds * 1000);
      });
      schObj.eventSettings.dataSource = this.test;
    });
  }

  public onActionBegin(args: any): void {
    if (args.requestType == "eventChange") {
      const docRef = doc(this.firestore, 'Data', args.changedRecords[0].DocumentId);
      updateDoc(docRef, {
        Subject: args.changedRecords[0].Subject,
        EndTime: args.changedRecords[0].EndTime,
        StartTime: args.changedRecords[0].StartTime,
        IsAllDay: args.changedRecords[0].IsAllDay,
        ConferenceId: args.changedRecords[0].ConferenceId
      });
    } else if (args.requestType == "eventCreate") {
      let guid = this.GuidFun();
      args.data[0].DocumentId = guid;
      this.schData = { ...args.data[0] };
      setDoc(doc(this.firestore, 'Data', guid), this.schData);
    } else if (args.requestType == "eventRemove") {
      deleteDoc(doc(this.firestore, 'Data', args.deletedRecords[0].DocumentId));
    }
  }

  public GuidFun(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}