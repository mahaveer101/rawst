import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getBlobFile(url): any {
    const options = { responseType: 'blob' as 'blob' };
    return this.httpClient.get(url, options).pipe(
      map(
        (res: any) => {
          return new Blob([res.blob()], { type: 'application/pdf' });
        })
    );
  }

  downloadFile(url, fileName) {
    try {
      saveAs(url, fileName);
    }
    catch (e) {
      console.log(e)
    }
  }
}
