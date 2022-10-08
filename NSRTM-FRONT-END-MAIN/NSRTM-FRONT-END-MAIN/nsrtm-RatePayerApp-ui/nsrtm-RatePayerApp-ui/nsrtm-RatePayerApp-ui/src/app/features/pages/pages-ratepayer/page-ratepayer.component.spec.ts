import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRatepayerComponent } from './page-ratepayer.component';

describe('PageRatepayerComponent', () => {
  let component: PageRatepayerComponent;
  let fixture: ComponentFixture<PageRatepayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRatepayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRatepayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
