import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { RecordChange } from '../model/record-change';
import { RecordChangeDataService } from './record-changes-data-service';

export class RecordChangesDataSource implements DataSource<RecordChange> {

  public recordChangesSubject: BehaviorSubject<RecordChange[]> = new BehaviorSubject<RecordChange[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private recordChangesService: RecordChangeDataService) {
  }

  loadRecordChanges(eventID: number, name: string) {

    this.loadingSubject.next(true);

    this.recordChangesService.getAllRecordChangesByParams(eventID, name).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)),
    )
      .subscribe(recordChanges => {
        this.recordChangesSubject.next(recordChanges);
      });

  }

  connect(collectionViewer: CollectionViewer): Observable<RecordChange[]> {
    return this.recordChangesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {

    this.recordChangesSubject.complete();
    this.loadingSubject.complete();
  }

}

