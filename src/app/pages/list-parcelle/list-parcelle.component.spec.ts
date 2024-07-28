import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcelleComponent } from './list-parcelle.component';

describe('ListParcelleComponent', () => {
  let component: ListParcelleComponent;
  let fixture: ComponentFixture<ListParcelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListParcelleComponent]
    });
    fixture = TestBed.createComponent(ListParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
