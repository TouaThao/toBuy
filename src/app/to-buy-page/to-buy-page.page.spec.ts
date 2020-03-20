import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToBuyPagePage } from './to-buy-page.page';

describe('ToBuyPagePage', () => {
  let component: ToBuyPagePage;
  let fixture: ComponentFixture<ToBuyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToBuyPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToBuyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
