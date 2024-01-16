import { Injectable } from '@angular/core';
import { urlConstants } from 'app/shared/constants/api-constants';
import { ApiService } from 'app/shared/services/api/api.service';
import { UserService } from 'app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) { }

  getEmployeeCalculation() {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}`);
  }

  getEmployeesBySearch(searchValue) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.user}?browser_id=${browserID}&search=${searchValue}`);
  }

  getUserTaxDetails(id) {
    const browserID = this.userService.getBrowerId();
    return this.apiService.get(`${urlConstants.viewCalculation}/${id}?browser_id=${browserID}`);
  }
  
  submitCalculationTax(){
    const browserID = this.userService.getBrowerId();
    const payload = {
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.calculationTax}`,payload);
  }
  
  submitUserCalculationTax(id){
    const browserID = this.userService.getBrowerId();
    const payload = {
      user_id:id,
      browser_id: browserID
    };
    return this.apiService.post(`${urlConstants.userTaxCalculation}`,payload);
  }
}
