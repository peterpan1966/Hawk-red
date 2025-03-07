// Obtén el hostname desde la URL actual
const hostname = window.location.hostname;

// Construye la URL base en función del hostname
const baseUrl = `${hostname}:8000`;

// Construye la URL completa para la API
const API_URL = `${hostname}:9000`;