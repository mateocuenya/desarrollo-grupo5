import api from "./api";

export type LoginPayload = {
  mailUsuario: string;
  contrasenaUsuario: string;
};

export async function login({ mailUsuario, contrasenaUsuario }: LoginPayload) {
  const { data } = await api.post("/auth/login", {
    mailUsuario,
    contrasenaUsuario,
  });

  // data = { mensaje, token, usuario: {...} }
  localStorage.setItem("token", data.token);
  // ⚠️ clave importante:
  localStorage.setItem("userId", String(data.usuario.idUsuario));
  localStorage.setItem("nombreUsuario", data.usuario.nombreUsuario ?? "");

  return data.usuario; // por si lo querés usar en el UI
}
