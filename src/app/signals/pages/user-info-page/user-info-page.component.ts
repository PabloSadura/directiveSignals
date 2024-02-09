import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServicesService } from '../../services/users-services.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit {
  private userService = inject(UsersServicesService);
  public userId = signal(1);

  public currentUSer = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if (!this.currentUSer()) return 'Usuario no encontrado';

    return `${this.currentUSer()?.first_name} ${this.currentUSer()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id <= 0) return;
    this.userId.set(id);
    this.currentUSer.set(undefined);

    this.userService.getUserbyId(id).subscribe({
      next: (user) => {
        this.currentUSer.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUSer.set(undefined);
      },
    });
  }
}
