const SUPABASE_URL = 'https://dshmmwyknvmxeeqsuxpt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzaG1td3lrbnZteGVlcXN1eHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTEwOTIsImV4cCI6MjA2NjI4NzA5Mn0.-FbDqdWKsjLjVmjtz42J7FRfhKklXjrOiAgo3jd7r_k';

async function enviarFormulario(data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inscripciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });

    const responseBody = await response.json();
    if (!response.ok) {
      console.error("Error del servidor:", response.status, response.statusText, responseBody);
    }
    return response.ok;
  } catch (error) {
    console.error("Error de conexión o sintaxis:", error);
    return false;
  }
}

document.getElementById("formulario").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    nombre_completo: form.nombre_completo.value,
    edad: parseInt(form.edad.value),
    correo_electronico: form.correo_electronico.value,
    telefono: form.telefono.value
  };

  const mensaje = document.getElementById("mensaje");
  const exito = await enviarFormulario(data);

  if (exito) {
    mensaje.innerText = "✅ ¡Formulario enviado correctamente!";
    mensaje.style.color = "green";
    form.reset();
  } else {
    mensaje.innerText = "❌ Error al enviar el formulario. Revisa la consola (F12).";
    mensaje.style.color = "red";
  }
});
