import { Injectable } from '@angular/core';
import { User } from 'app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private lat = null;
  private lng = null;
  private browserID = null;

  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  setLat(lat) {
    this.lat = lat;
  }

  getLat() {
    return this.lat;
  }

  setLng(lng) {
    this.lng = lng;
  }

  getLng() {
    return this.lng;
  }

  setBrowserId(browserID) {
    this.browserID = browserID;
  }

  getBrowerId() {
    return this.browserID;
  }
}
