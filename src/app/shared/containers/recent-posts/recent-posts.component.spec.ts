import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromPosts from '../../../store/reducers';
import { RecentPostsComponent } from './recent-posts.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ExcerptPipe } from '../../pipes/excerpt.pipe';

describe('RecentPostsComponent', () => {
  let component: RecentPostsComponent;
  let fixture: ComponentFixture<RecentPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentPostsComponent, ExcerptPipe],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          posts: combineReducers(fromPosts.reducers),
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
