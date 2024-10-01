import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernotificationComponent } from './user-notification.component';

describe('UserNotificationComponent', () => {
  let component: UsernotificationComponent;
  let fixture: ComponentFixture<UsernotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
