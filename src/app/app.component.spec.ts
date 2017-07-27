import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { CategoryService } from './category.service';
import { FakeCategoryService } from '../testing/FakeCategoryService';

import { CoolSessionStorage } from 'angular2-cool-storage';
import { FakeCoolSessionStorege } from '../testing/FakeCoolSessionStorage';

import { Router } from '@angular/router';
import { RouterStub } from '../testing/router-stubs';

describe('AppComponent', () => {
  let categoryService: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: CategoryService, useClass: FakeCategoryService},
        {provide: CoolSessionStorage, useClass: FakeCoolSessionStorege},
        {provide: Router, useClass: RouterStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    categoryService = fixture.debugElement.injector.get(CategoryService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FramApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('FramApp');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1 a').textContent).toContain('FramApp');
  });

  it('user should be logged out by the time of app initialization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.userLoggedIn).toEqual(false);
  });

  it('user should now be logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.pSignButton').textContent).toBe('Log Out');
  });
});
