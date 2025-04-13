// src/app/api/check-auth/route.js
import { verifyToken } from '../../../utils/auth';

export async function GET(request) {
  try {
    const cookies = request.headers.get('cookie');

    const token = cookies
      ?.split('; ')
      ?.find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return new Response(JSON.stringify({ error: 'No autorizado: Token no proporcionado / Unauthorized: Token not provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Token inválido / Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Usuario autenticado / User authenticated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error checking auth:', error);
    return new Response(
      JSON.stringify({ error: 'Error al verificar autenticación / Error checking authentication', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}