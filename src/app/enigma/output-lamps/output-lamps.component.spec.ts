import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputLampsComponent } from './output-lamps.component';

describe('OutputLampsComponent', () => {
  let component: OutputLampsComponent;
  let fixture: ComponentFixture<OutputLampsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputLampsComponent]
    });
    fixture = TestBed.createComponent(OutputLampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
