import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicBrainZComponent } from './music-brain-z.component';

describe('MusicBrainZComponent', () => {
  let component: MusicBrainZComponent;
  let fixture: ComponentFixture<MusicBrainZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicBrainZComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicBrainZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
