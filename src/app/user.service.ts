import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserProfile } from './userProfile';
@Injectable()
export class UserService {

  constructor(private firbase: FirebaseService) { }

  public SaveUserProfile(userProfile: UserProfile) {
    return this.firbase.putData(["userProfile", userProfile.id], userProfile);
  }

  public GetUserProfile(userId: string): Promise<UserProfile> {
    return this.firbase.getData(["userProfile", userId]);
  }
}
