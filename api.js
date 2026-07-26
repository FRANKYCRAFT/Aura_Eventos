<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Crear Cuenta — Aura Eventos</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<div class="auth-layout">

  <div class="auth-panel auth-hero">
    <div class="auth-hero-content">
      <span class="auth-eyebrow">Únete a Aura Eventos</span>
      <h1 class="auth-tagline">Crea tu cuenta<br>y empieza<br>a reservar.</h1>
      <p class="auth-desc">Accede al catálogo completo, gestiona tus reservaciones y recibe confirmaciones en tiempo real.</p>
      <div class="auth-stats">
        <div><div class="auth-stat-val">Gratis</div><div class="auth-stat-label">Sin costo de registro</div></div>
        <div><div class="auth-stat-val">&lt;24h</div><div class="auth-stat-label">Confirmación rápida</div></div>
        <div><div class="auth-stat-val">100%</div><div class="auth-stat-label">Seguro y confiable</div></div>
      </div>
    </div>
  </div>

  <div class="auth-panel" style="background:var(--page-bg);align-items:center;overflow-y:auto">
    <div class="auth-form-card" style="width:100%;max-width:440px">

      <div class="auth-logo">
        <img src="assets/logo-placeholder.svg" alt="Aura Eventos" style="max-height:32px"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div style="display:none;align-items:center;gap:.4rem">
          <div class="logo-mark">A</div>
          <span class="logo-text">AURA <span>EVENTOS</span></span>
        </div>
      </div>

      <div style="display:flex;gap:.5rem;margin-bottom:1.5rem">
        <a href="login.html" class="btn btn-ghost" style="flex:1;text-align:center">Iniciar Sesión</a>
        <button class="btn btn-primary" style="flex:1;cursor:default">Registrarse</button>
      </div>

      <h2 class="auth-card-title">Crear cuenta nueva</h2>
      <p class="auth-card-sub">Completa tus datos para comenzar. Es rápido y gratuito.</p>

      <div id="reg-error" class="alert alert-error" style="display:none;margin-bottom:1rem">
        <span class="alert-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </span>
        <div class="alert-content"><span id="reg-error-msg"></span></div>
      </div>

      <form id="reg-form" novalidate>
        <div class="form-row" style="margin-bottom:.875rem">
          <div class="form-group">
            <label class="form-label">Nombre(s) *</label>
            <input id="r-nombre" type="text" class="form-control" placeholder="María"
                   required autocomplete="given-name">
            <span class="form-error" id="e-nombre"></span>
          </div>
          <div class="form-group">
            <label class="form-label">Apellidos *</label>
            <input id="r-apellidos" type="text" class="form-control" placeholder="García López"
                   required autocomplete="family-name">
            <span class="form-error" id="e-apellidos"></span>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:.875rem">
          <label class="form-label">Correo Electrónico *</label>
          <div style="position:relative">
            <span style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/></svg>
            </span>
            <input id="r-email" type="email" class="form-control" placeholder="maria@gmail.com"
                   style="padding-left:2.5rem" required autocomplete="email">
            <span id="email-ok" style="position:absolute;right:.875rem;top:50%;transform:translateY(-50%);
                  color:var(--accent);display:none">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <span class="form-error" id="e-email"></span>
        </div>

        <div class="form-group" style="margin-bottom:.875rem">
          <label class="form-label">Teléfono de contacto</label>
          <div style="display:flex;gap:.5rem">
            <select class="form-control" style="width:100px;flex-shrink:0">
              <option value="+52">+52 MX</option>
              <option value="+1">+1 US</option>
            </select>
            <input id="r-tel" type="tel" class="form-control" placeholder="55 9876 5432" autocomplete="tel">
          </div>
        </div>

        <div class="form-row" style="margin-bottom:.5rem">
          <div class="form-group">
            <label class="form-label">Contraseña *</label>
            <div style="position:relative">
              <span style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input id="r-pass" type="password" class="form-control" placeholder="••••••••••"
                     style="padding-left:2.5rem" required autocomplete="new-password">
            </div>

            <div style="height:3px;background:var(--card-border);border-radius:99px;margin-top:.35rem;overflow:hidden">
              <div id="pwd-fill" style="height:100%;width:0;border-radius:99px;transition:.3s ease"></div>
            </div>
            <span class="form-error" id="e-pass"></span>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmar *</label>
            <input id="r-confirm" type="password" class="form-control" placeholder="••••••••••"
                   required autocomplete="new-password">
            <span class="form-error" id="e-confirm"></span>
          </div>
        </div>
        <div id="pwd-label" style="font-size:.78rem;margin-bottom:.875rem;display:none"></div>

        <label class="check-group" style="margin-bottom:1.25rem">
          <input type="checkbox" id="r-terms" required>
          <span>Acepto los <a href="#" class="auth-link">Términos de Servicio</a> y la
            <a href="#" class="auth-link">Política de Privacidad</a> de Aura Eventos.</span>
        </label>
        <span class="form-error" id="e-terms"></span>

        <button type="submit" class="btn btn-primary btn-block btn-lg" id="reg-btn">
          Crear mi cuenta gratis
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </form>

      <p class="auth-footer">¿Ya tienes cuenta? <a href="login.html" class="auth-link">Inicia sesión</a></p>
    </div>
  </div>
</div>

<script src="js/store.js"></script>
<script src="js/api.js"></script>
<script src="js/ui.js"></script>
<script src="js/icons.js"></script>
<script>

  const s = Store.Auth.session();
  if (s) window.location.href = s.rol==='admin' ? 'views/dashboard-admin.html' : 'views/dashboard-cliente.html';

  document.getElementById('r-pass').addEventListener('input', function() {
    const v    = this.value;
    const fill = document.getElementById('pwd-fill');
    const lbl  = document.getElementById('pwd-label');
    lbl.style.display = v ? 'block' : 'none';
    if (!v) return;
    if (v.length < 6) {
      fill.style.width = '25%'; fill.style.background = 'var(--danger)';
      lbl.textContent = 'Contraseña débil'; lbl.style.color = 'var(--danger)';
    } else if (v.length < 10) {
      fill.style.width = '60%'; fill.style.background = 'var(--warn)';
      lbl.textContent = 'Contraseña moderada'; lbl.style.color = 'var(--warn)';
    } else {
      fill.style.width = '100%'; fill.style.background = 'var(--accent)';
      lbl.textContent = 'Contraseña fuerte'; lbl.style.color = 'var(--accent)';
    }
  });

  document.getElementById('r-email').addEventListener('blur', function() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
    document.getElementById('email-ok').style.display = ok ? 'block' : 'none';
  });

  document.getElementById('reg-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre    = document.getElementById('r-nombre').value.trim();
    const apellidos = document.getElementById('r-apellidos').value.trim();
    const email     = document.getElementById('r-email').value.trim();
    const telefono  = document.getElementById('r-tel').value.trim();
    const password  = document.getElementById('r-pass').value;
    const confirm   = document.getElementById('r-confirm').value;
    const terms     = document.getElementById('r-terms').checked;

    ['nombre','apellidos','email','pass','confirm','terms'].forEach(f => {
      const el = document.getElementById('e-'+f); if (el) el.textContent = '';
    });
    document.getElementById('reg-error').style.display = 'none';

    let valid = true;
    const setErr = (f, msg) => {
      const el = document.getElementById('e-'+f);
      if (el) el.textContent = msg;
      valid = false;
    };

    if (!nombre)                                         setErr('nombre',   'Campo requerido');
    if (!apellidos)                                      setErr('apellidos','Campo requerido');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))      setErr('email',    'Correo inválido');
    if (password.length < 6)                             setErr('pass',     'Mínimo 6 caracteres');
    if (password !== confirm)                            setErr('confirm',  'Las contraseñas no coinciden');
    if (!terms)                                          setErr('terms',    'Debes aceptar los términos');
    if (!valid) return;

    const btn = document.getElementById('reg-btn');
    btn.disabled = true; btn.textContent = 'Creando cuenta...';

    const result = await Store.Auth.register({ nombre, apellidos, email, password, telefono });
    if (result.error) {
      document.getElementById('reg-error-msg').textContent = result.error;
      document.getElementById('reg-error').style.display   = 'flex';
      btn.disabled = false;
      btn.innerHTML = 'Crear mi cuenta gratis <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    } else {
      await Store.Auth.login(email, password);
      btn.textContent = 'Cuenta creada. Redirigiendo...';
      setTimeout(() => { window.location.href = 'views/catalogo.html'; }, 400);
    }
  });

</script>
</body>
</html>
