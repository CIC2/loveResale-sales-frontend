import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
private readonly _HttpClient = inject(HttpClient);
baseUrl=environment.baseUrl
 
joinMeeting():Observable<any>{
  return this._HttpClient.get<any>(`${this.baseUrl}/appointment/customer/zoom`);
  
}

}
