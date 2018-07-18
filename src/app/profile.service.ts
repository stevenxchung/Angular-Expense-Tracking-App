import { Injectable } from '@angular/core';
// Allow data sharing between components
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// Profile model
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileList: AngularFireList<any>;
  selectedProfile: Profile = new Profile();
  constructor(private firebase: AngularFireDatabase) { }

  // READ
  getData() {
    this.profileList = this.firebase.list('profiles');
    return this.profileList;
  }

  // CREATE
  insertProfile(profile: Profile) {
    this.profileList.push({
      owner: profile.owner,
      profileName: profile.profileName
    });
  }

  // UPDATE
  updateProfile(profile: Profile) {
    this.profileList.update(profile.$key,
      {
        owner: profile.owner,
        profileName: profile.profileName
      });
  }

  // DELETE
  deleteProfile($key: string) {
    this.profileList.remove($key);
  }

}
