// validationPago.ts
export interface PaymentFormData {
  cardNumber: string;      // tarjeta
  cvv: string;
  dni: string;
  month: string;
  year: string;
  cardType: 'Visa' | 'Mastercard' | 'American Express' | ''; 
  firstName: string;
  lastName: string;
  billingFirstName: string;
  billingLastName: string;
  billingDni: string;
  country: string;
  province: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
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
  province: string | null;
  country: string | null;
}


const allowedProvinces = ['Buenos Aires','Córdoba','Santa Fe','Mendoza','Tucumán'];
const allowedCountries = ['Argentina','Brasil','Chile','Uruguay','Paraguay'];

export const validateTrackForm = (data: PaymentFormData): ValidationError => {
  return {
    tarjeta: !data.cardNumber.trim()
      ? 'El número de tarjeta es obligatorio'
      : !/^\d{13,19}$/.test(data.cardNumber.replace(/\D/g, ''))
      ? 'Número de tarjeta inválido: debe tener entre 13 y 19 dígitos'
      : null,
    cvv: !data.cvv.trim()
      ? 'El CVV es obligatorio'
      : !/^\d{3,4}$/.test(data.cvv)
      ? 'CVV inválido: debe tener 3 o 4 dígitos'
      : null,
    dni: !data.dni.trim()
      ? 'El DNI es obligatorio'
      : !/^\d{7,9}$/.test(data.dni)
      ? 'DNI inválido: debe tener entre 7 y 9 dígitos'
      : null,
    nombre: !data.firstName.trim()
      ? 'El nombre es obligatorio'
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.firstName)
      ? 'Nombre inválido: solo letras y entre 2 y 50 caracteres'
      : null,
    apellido: !data.lastName.trim()
      ? 'El apellido es obligatorio'
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.lastName)
      ? 'Apellido inválido: solo letras y entre 2 y 50 caracteres'
      : null,
    calle: !data.street.trim()
      ? 'La calle es obligatoria'
      : !/^.{2,50}$/.test(data.street)
      ? 'Calle inválida: entre 2 y 50 caracteres'
      : null,
    numero: !data.number
      ? 'El número es obligatorio'
      : Number(data.number) <= 0
      ? 'Número inválido: debe ser mayor a 0'
      : null,
    cp: !data.postalCode.trim()
      ? 'El código postal es obligatorio'
      : !/^\d{4,5}$/.test(data.postalCode)
      ? 'Código postal inválido: debe tener 4 o 5 dígitos'
      : null,
    ciudad: !data.city.trim()
      ? 'La ciudad es obligatoria'
      : !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/.test(data.city)
      ? 'Ciudad inválida: solo letras y entre 2 y 50 caracteres'
      : null,
    country: !data.country
      ? 'El país es obligatorio'
      : !allowedCountries.includes(data.country)
      ? `País inválido: debe ser uno de ${allowedCountries.join(', ')}`
      : null,
    province: !data.province
      ? 'La provincia es obligatoria'
      : !allowedProvinces.includes(data.province)
      ? `Provincia inválida: debe ser una de ${allowedProvinces.join(', ')}`
      : null
  };
};
