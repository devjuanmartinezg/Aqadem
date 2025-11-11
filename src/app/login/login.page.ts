import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeBiometric } from 'capacitor-native-biometric';
import { AuthService } from 'src/app/services/data/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  codigoHost = '';
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onInputChange(event: any, tipo: string) {
    const inputValue = event.target.value;
    if (tipo === 'codigoHost') {
      event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.username || !this.password || !this.codigoHost) {
      this.errorMessage = 'Por favor, rellena todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.eliminarToken();

    console.log('🚀 Enviando login con:', {
      _username: this.username,
      _password: this.password,
      codigoHost: this.codigoHost.toUpperCase()
    });

    this.authService.login(this.codigoHost, this.username, this.password)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          if (res.token) {
            console.log('✅ Token recibido:', res.token);
            this.authService.guardarToken(res.token);
            this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
          } else {
            this.errorMessage = res.message || 'Código, usuario o contraseña incorrectos.';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('❌ Error de login:', err);
          if (err.status === 0) {
            this.errorMessage = 'No se pudo conectar con el servidor.';
          } else if (err.status === 504) {
            this.errorMessage = 'El servidor no respondió a tiempo.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado.';
          }
        }
      });
  }

  async iniciarConHuella() {
    try {
      const result = await NativeBiometric.isAvailable();

      if (!result.isAvailable) {
        alert('Debes configurar Huella o FaceID para usar esta opción.');
        return;
      }

      await NativeBiometric.verifyIdentity({
        title: 'Login con Biometría',
        subtitle: 'Usa tu huella o FaceID para iniciar sesión.',
        description: 'Accede a tu cuenta de Aqadem.',
        useFallback: true
      });

      console.log('🟢 Autenticación biométrica exitosa.');
      this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });

    } catch (error) {
      console.error('Error biometría:', error);
      alert('Autenticación fallida o cancelada.');
    }
  }
}
