import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  // Use profileList to store objects in an array
  profileList: Profile[];

  constructor(public profileService: ProfileService, private toastr: ToastrService) { }

  // Called after data-bound properties of a directive are initialized
  ngOnInit() {
    // On app load, will grab data from the firebase database "profiles" and load them onto the Profile[] array
    let x = this.profileService.getData();
    x.snapshotChanges().subscribe(item => {
      this.profileList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.profileList.push(y as Profile);
      });
    });
    this.resetForm();
  }

  // Add profile
  onSubmit(profileForm: NgForm) {
    if (profileForm.value.$key == null) {
      this.profileService.insertProfile(profileForm.value);
    } else {
      this.profileService.updateProfile(profileForm.value);
    }
    this.resetForm(profileForm);
    this.toastr.success('Submitted Successfully', 'Expense Form');
    console.log("Success!");
  }

  // Reset form to empty or null values
  resetForm(profileForm?: NgForm) {
    if (profileForm !== null) {
      profileForm.reset();
      this.profileService.selectedProfile = {
        $key: null,
        owner: '',
        profileName: ''
      }
    }
  }

  // Edit entry
  onEdit(profile: Profile) {
    // Use Object.assign() to make a copy of object (prevents modifying original data in real-time due to two-way-binding)
    this.profileService.selectedProfile = Object.assign({}, profile);
  }

  // Remove and item from the list
  onDelete(key: string) {
    if (confirm("Are you sure you want to delete this entry?") == true) {
      this.profileService.deleteProfile(key);
      this.toastr.warning('Deleted Successfully', 'Expense Form');
    }
  }


}
