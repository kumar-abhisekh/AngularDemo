import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean = false;
  users: object[] = [];
  addUserAction: boolean = true;
  selected: string = 'add';
  actions: object[] = [
    { value: 'add', viewValue: 'Add User' },
    { value: 'delete', viewValue: 'list User' },
  ];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }
  setAction(event) {
    console.log(event.value);
    this.addUserAction = event.value == 'add' ? true : false;
    console.log(this.addUserAction);
  }
}
