// Usuarios simulados
const USERS = [
  {
    id: 1,
    username: "admin",
    password: "1234",
    name: "Administrador",
    points: 120
  },
  {
    id: 2,
    username: "miranda",
    password: "2025",
    name: "Miranda",
    points: 80
  }
];

export function login(username, password) {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return null;

  // Guardar el usuario en localStorage para simular sesión real
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
