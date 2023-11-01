import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiEmailComponent } from './verfi-email.component';

describe('VerfiEmailComponent', () => {
  let component: VerfiEmailComponent;
  let fixture: ComponentFixture<VerfiEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiEmailComponent]
    });
    fixture = TestBed.createComponent(VerfiEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
