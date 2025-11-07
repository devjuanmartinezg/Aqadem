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

  codigoCentro = '';
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Permite solo caracteres alfanuméricos en los campos.
   */
  onInputChange(event: any, tipo: string) {
    const inputValue = event.target.value;
    if (tipo === 'codigoCentro') {
      event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    }
  }

  /**
   * Muestra u oculta la contraseña.
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Inicia sesión normal (preparado para backend).
   */
  login() {
    if (!this.username || !this.password || !this.codigoCentro) {
      this.errorMessage = 'Por favor, rellena todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.codigoCentro, this.username, this.password)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          if (res.success) {
            // ✅ Guardamos el token en localStorage
            this.authService.guardarToken(res.token);
            console.log('Token recibido:', res.token);
            this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
          } else {
            this.errorMessage = res.message || 'Código, usuario o contraseña incorrectos.';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('❌ Error de login:', err);

          // Diferenciamos según el error
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

  /**
   * Inicia sesión con autenticación biométrica (Huella o FaceID).
   */
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
