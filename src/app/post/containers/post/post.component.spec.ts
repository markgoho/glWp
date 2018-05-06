// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { PostComponent } from './post.component';
// import { combineReducers } from '@ngrx/store';
// // import { PostsState } from '../../../store/reducers/posts.reducer';
// import { StoreModule } from '@ngrx/store';
// import * as fromPosts from '../../../store/reducers';
// import { ActivatedRoute } from '@angular/router';
// // import { MockActivatedRoute } from '../../../../mocks/activated-route';

// fdescribe('PostComponent', () => {
//   let component: PostComponent;
//   let fixture: ComponentFixture<PostComponent>;
//   // let activeRoute: MockActivatedRoute;

//   // beforeEach(() => {
//   //   activeRoute = new MockActivatedRoute();
//   // });

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [PostComponent],
//       imports: [
//         StoreModule.forRoot({
//           posts: combineReducers(fromPosts.reducers),
//         }),
//       ],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               params: {
//                 anything: 'anythingElse',
//               },
//             },
//           },
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(PostComponent);
//     // const store: Store<PostsState> = TestBed.get(Store);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
