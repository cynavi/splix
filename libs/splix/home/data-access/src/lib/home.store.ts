import { Injectable } from '@angular/core';





export type UserPaymentInfo = {
  id: string;
  userId: string;
  mobileNumber?: string;
  accountName?: string;
  accountNumber?: string;
  branchName?: string;
};

interface HomeState {

}

@Injectable()
export class HomeStore {


}
