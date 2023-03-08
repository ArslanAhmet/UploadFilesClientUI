
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCreate: boolean;
  name: string;
  address: string;
  response: { dbPath: '' };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isCreate = true;
  }

  onCreate = () => {

  }


  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.address = '';
  }

  uploadFinished = (event) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }
}
