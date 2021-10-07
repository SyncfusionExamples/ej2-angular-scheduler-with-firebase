import { Component } from '@angular/core';
import { DayService, WeekService, WorkWeekService, GroupModel, TimelineViewsService, TimelineMonthService, MonthService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  providers: [DayService, WeekService, WorkWeekService, TimelineViewsService, TimelineMonthService, MonthService, AgendaService, ResizeService, DragAndDropService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any;
  resItems: any;
  public test;
  public currentView = "Week";
  public data;
  public schData = { Subject: null, StartTime: null, EndTime: null, ConferenceId: null, IsAllDay: null, Id: null, DocumentId: null };
  public group: GroupModel = { resources: ['Owners'] };
  public categoryDataSource: any;

  public allowMultiple: Boolean = true;
  public selectedDate = new Date(2019, 8, 24);
  constructor(db: AngularFirestore) {
    this.resItems = db.collection('ResourceData').valueChanges().subscribe(resData => { // Resource Data source
      this.categoryDataSource = resData; 
    })
    this.data = db.collection('Data');
    this.items = db.collection('Data').valueChanges().subscribe(data => { // Scheduler events
      this.items = data;
      this.test = data;
      let schObj = (document.querySelector('.e-schedule') as any).ej2_instances[0];
      let length = this.test.length;
      for (let i = 0; i < length; i++) {
        let endTime = this.test[i].EndTime.seconds.toString() + "000";
        let srtTime = this.test[i].StartTime.seconds.toString() + "000";
        this.test[i].StartTime = new Date(parseInt(srtTime));
        this.test[i].EndTime = new Date(parseInt(endTime));
      }
      schObj.eventSettings.dataSource = this.test;
    })
  }
  public onActionBegin(args: any): void {
    if (args.requestType == "eventChange") {
      this.data.doc(args.changedRecords[0].DocumentId).update({ Subject: args.changedRecords[0].Subject });
      this.data.doc(args.changedRecords[0].DocumentId).update({ EndTime: args.changedRecords[0].EndTime });
      this.data.doc(args.changedRecords[0].DocumentId).update({ StartTime: args.changedRecords[0].StartTime });
      this.data.doc(args.changedRecords[0].DocumentId).update({ IsAllDay: args.changedRecords[0].IsAllDay });
      this.data.doc(args.changedRecords[0].DocumentId).update({ ConferenceId: args.changedRecords[0].ConferenceId });
    } else if (args.requestType == "eventCreate") {
      let guid = (this.GuidFun() + this.GuidFun() + "-" + this.GuidFun() + "-4" + this.GuidFun().substr(0, 3) + "-" + this.GuidFun() + "-" + this.GuidFun() + this.GuidFun() + this.GuidFun()).toLowerCase();
      args.data[0].DocumentId = guid.toString();
      this.schData.Subject = args.data[0].Subject;
      this.schData.StartTime = args.data[0].StartTime;
      this.schData.EndTime = args.data[0].EndTime;
      this.schData.ConferenceId = args.data[0].ConferenceId;
      this.schData.IsAllDay = args.data[0].IsAllDay;
      this.schData.Id = args.data[0].Id;
      this.schData.DocumentId = args.data[0].DocumentId;
      this.data.doc(guid).set(this.schData);
    } else if (args.requestType == "eventRemove") {
      this.data.doc(args.deletedRecords[0].DocumentId).delete();
    }
  }
  public GuidFun() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
