import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  BACKEND_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  getMoments() {
    return this.http.get(this.BACKEND_URL + '/moments/list');
  }

  addMoment(data: any) {
    return this.http.post(this.BACKEND_URL + '/moments/add-moment', data);
  }

  updateMoment(data: any) {
    return this.http.put(this.BACKEND_URL + '/moments/update-moment', data);
  }

  deleteMoment(data: any) {
    return this.http.delete(this.BACKEND_URL + '/moments/remove-moment/' + data._id);
  }

  fileUpload(data: any) {
    let formData = new FormData();
    data.forEach((file: any) => {
      formData.append('documents', file);
    })
    return this.http.post<any>(this.BACKEND_URL + '/moments/multi-upload', formData, { observe: 'events', reportProgress: true })
  }
}
