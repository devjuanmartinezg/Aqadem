import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  codigoCentro: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private navCtrl: NavController) { }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    }
  }

  login(){
    if (!this.username || !this.password || !this.codigoCentro) {
      this.errorMessage = 'Por favor, rellena todos los campos.';
      return;
    }

    if (this.codigoCentro === '12345' && this.username === 'admin' && this.password === '1234') {
      this.errorMessage = '';
      this.navCtrl.navigateForward('/dashboard');
    } else {
      this.errorMessage = 'Codigo, usuario o contraseña incorrectos.';
    }           
  }

  ngOnInit() {
  }

}
