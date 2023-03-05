import { Injectable } from '@angular/core';
import { HttpWrapperService } from './httpWrapper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetItem } from '../model/asset-item';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AssetDataService {
  private actionUrl: string;

  constructor(private http: HttpWrapperService, private httpClient: HttpClient) {
    this.actionUrl = environment.server + 'eventrecords';
  }

  getAllAssets() {
    return this.http.get<AssetItem[]>(this.actionUrl);
  }

  getSingleAsset(id: string) {
    return this.http.get<AssetItem>(this.actionUrl + id);
  }

  updateAsset(id: string, assetToUpdate: AssetItem) {
    return this.http.put<AssetItem>(this.actionUrl + id, assetToUpdate);
  }
  // deleteAsset(item: AssetItem) {
  //   return this.http.delete(this.actionUrl + item.RFE_PIECE_ID);
  // }

  getAllAssetsByParams(
    filter = '', sortOrder = 'ID desc',
    pageNumber = 0, pageSize = 10): Observable<AssetItem[]> {

    return this.httpClient.get<AssetItem[]>(this.actionUrl,
      {
        params: new HttpParams()
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      }
    );
  }
}
