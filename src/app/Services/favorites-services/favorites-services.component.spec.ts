import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteServicesComponent } from './favorites-services.component';

describe('FavoritesServicesComponent', () => {
  let component: FavoriteServicesComponent;
  let fixture: ComponentFixture<FavoriteServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
