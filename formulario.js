const SUPABASE_URL = 'https://dshmmwyknvmxeeqsuxpt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIs...'; // Trunca si lo publicas

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;

  try {
    const { data, error } = await fetch(`${SUPABASE_URL}/rest/v1/inscripciones`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        nombre,
        edad,
        correo,
        telefono
      })
    }).then(res => res.json());

    if (error) {
      alert('❌ Error al enviar: ' + error.message);
      console.error(error);
    } else {
      alert('✅ Formulario enviado correctamente');
      form.reset();
    }

  } catch (err) {
    console.error('Error de red o configuración:', err);
    alert('❌ Hubo un error al conectar con el servidor.');
  }
});
