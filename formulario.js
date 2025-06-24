const SUPABASE_URL = 'https://dshmmwyknvmxeeqsuxpt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // reemplaza si es necesario

async function enviarFormulario(data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inscripciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'  // Te devuelve el objeto insertado o error
      },
      body: JSON.stringify(data)
    });

    const resultado = await response.json();

    if (!response.ok) {
      console.error("❌ ERROR HTTP:", response.status);
      console.error("🧠 DETALLES:", resultado);
      throw new Error(`HTTP ${response.status} - ${JSON.stringify(resultado)}`);
    }

    console.log("✅ INSERCIÓN EXITOSA:", resultado);
    return { success: true, data: resultado };

  } catch (error) {
    console.error("💥 EXCEPCIÓN:", error.message);
    return { success: false, error: error.message };
  }
}

// Prueba de ejemplo
document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    id: crypto.randomUUID(), // Genera un UUID único
    nombre_completo: form.nombre_completo.value,
    edad: parseInt(form.edad.value),
    correo_electronico: form.correo_electronico.value,
    telefono: form.telefono.value
  };
  

  const { success, error } = await enviarFormulario(data);
  const mensaje = document.getElementById("mensaje");

  if (success) {
    mensaje.innerText = "✅ ¡Formulario enviado correctamente!";
    mensaje.style.color = "green";
  } else {
    mensaje.innerText = `❌ Error: ${error}`;
    mensaje.style.color = "red";
  }
});
