import { Injectable } from '@angular/core';
import { HttpWrapperService } from './httpWrapper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecordChange } from '../model/record-change';

@Injectable({ providedIn: 'root' })
export class RecordChangeDataService {
  private actionUrl: string;

  constructor(private http: HttpWrapperService, private httpClient: HttpClient) {
    this.actionUrl = environment.server + 'eventrecords/changes';
  }

  getAllRecordChangesByParams(
    eventID: number, name: string,
    pageNumber = 0, pageSize = 10): Observable<RecordChange[]> {

    console.log('actionUrl:  ' + this.actionUrl);
    console.log('eventID:  ' + eventID);
    console.log('name:  ' + name);
    return this.httpClient.get<RecordChange[]>(this.actionUrl,
      {
        params: new HttpParams()
          .set('eventID', eventID)
          .set('name', name)
      }
    );
  }
}
