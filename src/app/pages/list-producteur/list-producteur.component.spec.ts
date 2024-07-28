import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProducteurComponent } from './list-producteur.component';

describe('ListProducteurComponent', () => {
  let component: ListProducteurComponent;
  let fixture: ComponentFixture<ListProducteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProducteurComponent]
    });
    fixture = TestBed.createComponent(ListProducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
