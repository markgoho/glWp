import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostComponent } from './post.component';
import { combineReducers } from '@ngrx/store';
// import { PostsState } from '../../../store/reducers/posts.reducer';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from '../../../store/reducers';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../../mocks/activated-route';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let activatedRoute: ActivatedRouteStub;
  activatedRoute = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PostComponent],
      imports: [
        StoreModule.forRoot({
          posts: combineReducers(fromPosts.reducers),
        }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.testParams = { postSlug: 'ABCDEF' };
    fixture = TestBed.createComponent(PostComponent);
    // const store: Store<PostsState> = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
