import { TestBed } from '@angular/core/testing';

import { NotificationsPushService } from './notifications-push.service';

describe('NotificationsPushService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationsPushService = TestBed.get(NotificationsPushService);
    expect(service).toBeTruthy();
  });
});
