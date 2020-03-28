import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModePage } from './mode.page';

describe('ModePage', () => {
  let component: ModePage;
  let fixture: ComponentFixture<ModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
