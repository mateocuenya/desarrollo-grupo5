export interface PaymentFormData {
    tarjeta: string;
    cvv: string;
    dni: string;
    nombre: string;
    apellido: string;
    calle: string;
    numero: string;
    cp: string;
    ciudad: string;
}

export interface ValidationError {
    tarjeta: string | null;
    cvv: string | null;
    dni: string | null;
    nombre: string | null;
    apellido: string | null;
    calle: string | null;
    numero: string | null;
    cp: string | null;
    ciudad: string | null;
}

// Función auxiliar para validar número de tarjeta con el algoritmo de Luhn
const isValidCardNumber = (num: string): boolean => {
  let sum = 0;
  let shouldDouble = false;

  // Recorre los dígitos desde el final
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const validateTrackForm = (data: PaymentFormData): ValidationError => {
  return {
    tarjeta: !data.tarjeta.trim()
      ? "El número de tarjeta es obligatorio"
      : !/^\d{13,19}$/.test(data.tarjeta)
      ? "Número de tarjeta inválido: debe tener entre 13 y 19 dígitos"
      : !isValidCardNumber(data.tarjeta)
      ? "Número de tarjeta inválido: verifique los dígitos"
      : null,

    cvv: !data.cvv.trim()
      ? "El CVV es obligatorio"
      : !/^\d{3,4}$/.test(data.cvv)
      ? "CVV inválido: debe tener 3 o 4 dígitos"
      : null,

    dni: !data.dni.trim()
      ? "El DNI es obligatorio"
      : !/^\d{7,9}$/.test(data.dni)
      ? "DNI inválido: debe tener entre 7 y 9 dígitos"
      : null,

    nombre: !data.nombre.trim()
      ? "El nombre es obligatorio"
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.nombre)
      ? "Nombre inválido: solo letras y entre 2 y 50 caracteres"
      : null,

    apellido: !data.apellido.trim()
      ? "El apellido es obligatorio"
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.apellido)
      ? "Apellido inválido: solo letras y entre 2 y 50 caracteres"
      : null,

    calle: !data.calle.trim()
      ? "La calle es obligatoria"
      : !/^.{2,50}$/.test(data.calle)
      ? "Calle inválida: entre 2 y 50 caracteres"
      : null,

    numero: !data.numero.trim()
      ? "El número es obligatorio"
      : !/^\d{1,5}$/.test(data.numero)
      ? "Número inválido: debe ser numérico"
      : null,

    cp: !data.cp.trim()
      ? "El código postal es obligatorio"
      : !/^\d{4,5}$/.test(data.cp)
      ? "Código postal inválido: debe tener 4 o 5 dígitos"
      : null,

    ciudad: !data.ciudad.trim()
      ? "La ciudad es obligatoria"
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.ciudad)
      ? "Ciudad inválida: solo letras y entre 2 y 50 caracteres"
      : null,
  };
};