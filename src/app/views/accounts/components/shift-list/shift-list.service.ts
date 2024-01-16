import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftListService {
  
  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }

  getShiftsList() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allShiftListPage}?browser_id=${browserID}`);
  }
  
  getShiftBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.allShiftListPage}?browser_id=${browserID}&search=${searchValue}`);
  }
}
