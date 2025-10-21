import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajesChatPerfilPage } from './mensajes-chat-perfil.page';

describe('MensajesChatPerfilPage', () => {
  let component: MensajesChatPerfilPage;
  let fixture: ComponentFixture<MensajesChatPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesChatPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
