import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, mergeMap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError, interval, Subject } from "rxjs";
import { ClientJS } from 'clientjs';
import { urlConstants } from "app/shared/constants/api-constants";
import { UserService } from "../user/user.service";
import { ApiService } from "../api/api.service";
import { NotificationBarService } from "../notification-bar/notification-bar.service";

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User = {};
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  return: string;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "USER";
  lat = null;
  lng = null;
  browserID = null;
  profilePic = new BehaviorSubject('');
  companyLogo = new BehaviorSubject('');
  companyName = new BehaviorSubject('');
  notifications = new BehaviorSubject([]);
  locationStatus = new Subject();

  constructor(
    private ls: LocalStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
    private notificationBar: NotificationBarService
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
    this.setUserLocation();
  }

  public signin(email: string, password: string) {
    this.signingIn = true;
    const reqObj = {
      email,
      password,
      lng: this.lng,
      lat: this.lat,
      browser_id: this.browserID
    };
    return this.apiService.post(`${urlConstants.login}`, reqObj)
      .pipe(
        map((res: any) => {
          this.user = res.data;
          this.setUserAndToken(res.data.token, res.data, !!res);
          this.signingIn = false;
          this.refreshUserLocation();
          return res;
        }),
        catchError((error) => {
          return throwError(() => error.error || {});
        })
      );
  }

  public checkTokenIsValid() {
    return of(this.user)
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), this.getUser(), true);
          this.signingIn = false;
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  public signout() {
    const reqObj = {
      browser_id: this.browserID,
      lat: this.lat,
      lng: this.lng
    };
    this.apiService.post(`${urlConstants.logout}`, reqObj).subscribe(() => {
      this.navigateToSignInOnLogout();
    });
  }

  navigateToSignInOnLogout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  refreshUserLocation() {
    interval(30 * 60 * 1000).pipe(
      mergeMap(() => this.refreshLocation())
    ).subscribe((res) => console.log(res));
  }

  refreshLocation() {
    this.setUserLocation();
    if (!this.user) {
      this.user = this.getUser();
    }
    const reqObj = {
      user_id: this.user.id, 
      lat: this.lat,
      lng: this.lng
    };
    return this.apiService.post(`${urlConstants.location}`, reqObj);
  }

  setUserLocation() {
    const options = {
      enableHighAccuracy: true,
      maximumAge:60000, 
      timeout:5000,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      }, error => {
        this.publishLocationStatus(error);
      },
      options);
    }
    const client = new ClientJS();
    this.browserID = client.getFingerprint();
    this.userService.setLat(this.lat);
    this.userService.setLng(this.lng);
    this.userService.setBrowserId(this.browserID);
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.userService.setUser(user);
    this.setProfilePic(user?.profile_pic || '');
    this.setCompanyLogo(user?.company?.logo || '');
    this.setCompanyName(user?.company?.company_name || '');
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }

  getProfilePic() {
    return this.profilePic.asObservable();
  }

  setProfilePic(url: string, fromProfile = false) {
    if (fromProfile) {
      const user = this.getUser();
      user.profile_pic = url;
      this.ls.setItem(this.APP_USER, user);
    }
    this.profilePic.next(url);
  }

  getCompanyLogo() {
    return this.companyLogo.asObservable();
  }

  setCompanyLogo(url: string, fromCompany = false) {
    if (fromCompany) {
      const user = this.getUser();
      user.company.logo = url;
      this.ls.setItem(this.APP_USER, user);
    }
    this.companyLogo.next(url);
  }

  getCompanyName() {
    return this.companyName.asObservable();
  }

  setCompanyName(name: string, fromCompany = false) {
    if (fromCompany) {
      const user = this.getUser();
      user.company.company_name = name;
      this.ls.setItem(this.APP_USER, user);
    }
    this.companyName.next(name);
  }

  setForcePasswordChange(user: User) {
    this.user = user;
    this.user$.next(user);
    this.userService.setUser(user);
    this.ls.setItem(this.APP_USER, user);
  }

  publishNotifications(notifications) {
    const normalNotifications = notifications.filter(({ type }) => type ===  'normal');
    const highNotifications = notifications.filter(({ type }) => type ===  'high');
    const mediumNotifications = notifications.filter(({ type }) => type ===  'medium');
    this.notifications.next(normalNotifications);
    this.notificationBar.showNotifications([...highNotifications, ...mediumNotifications]);
  }

  getNotifications() {
    return this.notifications.asObservable();
  }

  startWork() {
    const payload = {
      browser_id: this.userService.getBrowerId(),
      lat: this.lat,
      lng: this.lng
    };
    return this.apiService.post(`${urlConstants.startWork}`, payload);
  }

  stopWork() {
    const payload = {
      browser_id: this.userService.getBrowerId(),
      lat: this.lat,
      lng: this.lng
    };
    return this.apiService.post(`${urlConstants.stopWork}`, payload);
  }

  publishLocationStatus(status) {
    this.locationStatus.next(status);
  }

  getLocationStatus() {
    return this.locationStatus.asObservable();
  }
}
