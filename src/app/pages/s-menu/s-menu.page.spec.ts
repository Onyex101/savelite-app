import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SMenuPage } from './s-menu.page';

describe('SMenuPage', () => {
  let component: SMenuPage;
  let fixture: ComponentFixture<SMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
