import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NativeBiometric } from 'capacitor-native-biometric';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  // Maneja cambios de input para permitir solo alfanuméricos
  onInputChange(event: any) {
    const inputValue = event.target.value;
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    }
  }

  login() {
    if (!this.username || !this.password || !this.codigoCentro) {
      this.errorMessage = 'Por favor, rellena todos los campos.';
      return;
    }

    if (this.codigoCentro === '12345' && this.username === 'admin' && this.password === '1234') {
      this.errorMessage = '';
      this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
    } else {
      this.errorMessage = 'Código, usuario o contraseña incorrectos.';
    }
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Asume que tienes un constructor y otras funciones aquí.

async iniciarConHuella() {
  try {
    // 1. Verificar la disponibilidad de la biometría (Huella, FaceID, etc.)
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) {
      console.log('Biometría no disponible o no configurada en el dispositivo.');
      alert('Debes configurar Huella o FaceID para usar esta opción.');
      return;
    }

    // 2. Definir el mensaje que verá el usuario en el prompt nativo
    const verificationOptions = {
      title: 'Login con Biometría',
      subtitle: 'Usa tu huella dactilar o FaceID para iniciar sesión.',
      description: 'Accede a tu cuenta de Aqadem de forma segura.',
      // Añade 'CONFIRM_DEVICE_CREDENTIAL' para permitir usar PIN/Patrón si la biometría falla (solo Android)
      useFallback: true 
    };

    // 3. Solicitar la verificación
    await NativeBiometric.verifyIdentity(verificationOptions);

    // Si el código llega aquí, la autenticación fue exitosa
    console.log(' Autenticación Biométrica Exitosa. ¡Iniciando sesión!');
    // ESTA ES LA LÍNEA CLAVE: Navega a la ruta de tu página principal
    this.router.navigate(['/tabs/dashboard']); 

  } catch (error) {
    // Manejar errores (cancelación por parte del usuario, huella no reconocida, etc.)
    console.error('Error de autenticación biométrica o usuario canceló:', error);
    alert('Autenticación fallida o cancelada.');
  }
}

}

