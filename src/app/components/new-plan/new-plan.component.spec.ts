import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPlanComponent } from './new-plan.component';

describe('NewPlanComponent', () => {
  let component: NewPlanComponent;
  let fixture: ComponentFixture<NewPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
