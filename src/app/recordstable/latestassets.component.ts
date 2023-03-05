import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { merge, fromEvent, Subscription, Observable, timer } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssetsDataSource } from '../services/assets-data-source';
import { AssetDataService } from '../services/asset-data-service';
import { AssetItem } from '../model/asset-item';
import { RecordChangesDialogComponent } from '../record-changes-modal/record-changes-modal.component';

@Component({
  selector: 'app-latest-assets',
  templateUrl: './latestassets.component.html',
  styleUrls: ['./latestassets.component.css']
})
export class LatestAssetsComponent implements OnInit {

  sortedData!: AssetsDataSource;
  displayedColumns = ['eventID', 'eventType', 'country', 'league', 'homeTeam', 'awayTeam', 'eventTime'];

  subscription!: Subscription;
  refreshTime: Observable<number> = timer(0, 30000);

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild('input', { static: true })
  input!: ElementRef;
  totalCount: any;

  constructor(private assetsService: AssetDataService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sortedData = new AssetsDataSource(this.assetsService);
    this.sortedData.loadAssets(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 3);
    this.subscription = this.refreshTime.subscribe(() => {
      this.loadAssetsPage();
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAssetsPage())
      )
      .subscribe();
  }

  loadAssetsPage() {
    this.sortedData.loadAssets(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 10);
  }
  public highlightRow(emp: AssetItem, eventType: string) {
    // console.log(emp.eventID.toString() + '  ' + eventType);

    const config = new MatDialogConfig();

    //  dialogConfig.disableClose = true;
    config.autoFocus = true;

    emp.eventType = eventType;
    config.data = {
      ...emp
    };
    config.width = '400px';
    config.height = 'auto';
    const dialogRef = this.dialog.open(RecordChangesDialogComponent, config);

    dialogRef.afterClosed().subscribe(
      val => {

      },
    );
  }
}
