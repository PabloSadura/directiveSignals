import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent implements OnInit {
  ngOnInit(): void {
    setInterval(() => {
      this.counter.update((current) => current + 1);
      if (this.counter() == 15) this.userChangedEffect.destroy();
    }, 1000);
  }
  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'pablosdura@mail.com',
    first_name: 'Pablo',
    last_name: 'Sadura',
    avatar: '',
  });

  public fullName = computed(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  onFliedUpdate(field: keyof User, value: string) {
    this.user.mutate((current) => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        default:
          break;
      }
    });
  }
}
