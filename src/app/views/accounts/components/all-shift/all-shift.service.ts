import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AllShiftService {
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }


  getAllShift() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allShiftPage}?browser_id=${browserID}`);
  }
  getAllShiftBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allShiftPage}?browser_id=${browserID}&search=${searchValue}`);
  }
}