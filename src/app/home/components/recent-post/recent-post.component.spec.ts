import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPostComponent } from './recent-post.component';

describe('RecentPostComponent', () => {
  let component: RecentPostComponent;
  let fixture: ComponentFixture<RecentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
