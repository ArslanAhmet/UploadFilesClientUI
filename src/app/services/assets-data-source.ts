import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AssetItem } from '../model/asset-item';
import { AssetDataService } from './asset-data-service';

export class AssetsDataSource implements DataSource<AssetItem> {

  private assetsSubject: BehaviorSubject<AssetItem[]> = new BehaviorSubject<AssetItem[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private assetsService: AssetDataService) {
  }

  loadAssets(pageIndex: number, pageSize: number) {

    this.loadingSubject.next(true);

    this.assetsService.getAllAssetsByParams('', 'ID',
    pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe(assets => {

        this.assetsSubject.next(assets);
      });

  }

  connect(collectionViewer: CollectionViewer): Observable<AssetItem[]> {
    return this.assetsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {

    this.assetsSubject.complete();
    this.loadingSubject.complete();
  }

}

