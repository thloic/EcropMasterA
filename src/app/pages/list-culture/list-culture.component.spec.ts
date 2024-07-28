import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCultureComponent } from './list-culture.component';

describe('ListCultureComponent', () => {
  let component: ListCultureComponent;
  let fixture: ComponentFixture<ListCultureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCultureComponent]
    });
    fixture = TestBed.createComponent(ListCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
