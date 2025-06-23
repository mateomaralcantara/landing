@echo off
cd /d "C:\Users\martin\Desktop\aplicaciones\Landing"
echo === Actualizando Landing en GitHub ===
git add .
git commit -m "Actualización automática del proyecto landing"
git push origin main
echo.
echo ✅ Proyecto subido a GitHub correctamente.
echo 🔁 Vercel se actualizará automáticamente.
pause
