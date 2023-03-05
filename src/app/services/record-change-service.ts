

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { RecordChange } from "../model/record-change";


@Injectable()
export class RecordChangesService {

    constructor(private http:HttpClient) {

    }

    findAllRecordChangesLessons(eventID:number,name: string): Observable<RecordChange[]> {
        console.log(eventID + '  ' + name);
        return this.http.get('https://localhost:7268/changes', {
            params: new HttpParams()
                .set('eventID', eventID.toString())
                .set('name', name)
        }).pipe(
            map(res =>  res["payload"])
        );
    }
 

}
