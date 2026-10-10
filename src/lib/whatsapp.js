import { perfil } from '../data';

// Link do WhatsApp com mensagem já preenchida.
export const zap = (msg) =>
  `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(msg)}`;
