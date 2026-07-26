<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Recuperar Contraseña — Aura Eventos</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<div class="auth-layout">

  <div class="auth-panel auth-hero">
    <div class="auth-hero-content">
      <span class="auth-eyebrow">Recuperación de acceso</span>
      <h1 class="auth-tagline">Recupera tu<br>cuenta en tres<br>pasos simples.</h1>
      <p class="auth-desc">Te enviaremos un código de verificación a tu correo para que puedas crear una nueva contraseña de forma segura.</p>
      <div class="auth-stats">
        <div><div class="auth-stat-val">1</div><div class="auth-stat-label">Ingresa tu correo</div></div>
        <div><div class="auth-stat-val">2</div><div class="auth-stat-label">Verifica el código</div></div>
        <div><div class="auth-stat-val">3</div><div class="auth-stat-label">Nueva contraseña</div></div>
      </div>
    </div>
  </div>

  <div class="auth-panel" style="background:var(--page-bg);align-items:center">
    <div class="auth-form-card" style="width:100%;max-width:440px">

      <div class="auth-logo">
        <img src="assets/logo-placeholder.svg" alt="Aura Eventos" style="max-height:32px"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div style="display:none;align-items:center;gap:.4rem">
          <div class="logo-mark">A</div>
          <span class="logo-text">AURA <span>EVENTOS</span></span>
        </div>
      </div>

      <div class="recovery-stepper" aria-hidden="true">
        <div class="recovery-step active" id="step-dot-1"><span>1</span>Correo</div>
        <div class="recovery-step-line" id="step-line-1"></div>
        <div class="recovery-step" id="step-dot-2"><span>2</span>Código</div>
        <div class="recovery-step-line" id="step-line-2"></div>
        <div class="recovery-step" id="step-dot-3"><span>3</span>Contraseña</div>
      </div>

      <div id="rec-alert" style="display:none;margin-bottom:1rem"></div>

      <div id="step-1">
        <h2 class="auth-card-title">¿Olvidaste tu contraseña?</h2>
        <p class="auth-card-sub">Ingresa el correo con el que te registraste y te enviaremos un código de verificación.</p>
        <div class="form-group" style="margin-bottom:1.25rem">
          <label class="form-label">Correo Electrónico</label>
          <div style="position:relative">
            <span style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
            <input id="rec-email" type="email" class="form-control" placeholder="maria@gmail.com"
                   style="padding-left:2.5rem" autocomplete="email">
          </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" id="btn-step-1" onclick="submitEmail()">Enviar código</button>
      </div>

      <div id="step-2" style="display:none">
        <h2 class="auth-card-title">Revisa tu correo</h2>
        <p class="auth-card-sub">Enviamos un código de 6 dígitos a <strong id="rec-email-echo"></strong>. Expira en 10 minutos.</p>

        <div id="demo-code-box" class="alert alert-info" style="margin-bottom:1rem">
          <span class="alert-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
          <div class="alert-content">
            <div class="alert-title">Modo demo (sin servidor de correo)</div>
            Tu código es: <strong id="demo-code" style="font-size:1rem;letter-spacing:.15em"></strong>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:1.25rem">
          <label class="form-label">Código de verificación</label>
          <input id="rec-code" type="text" inputmode="numeric" maxlength="6" class="form-control recovery-code-input"
                 placeholder="000000" autocomplete="one-time-code">
        </div>
        <button class="btn btn-primary btn-block btn-lg" id="btn-step-2" onclick="submitCode()">Verificar código</button>
        <button class="btn btn-ghost btn-block" style="margin-top:.5rem" onclick="resendCode()">Reenviar código</button>
      </div>

      <div id="step-3" style="display:none">
        <h2 class="auth-card-title">Crea tu nueva contraseña</h2>
        <p class="auth-card-sub">Debe tener al menos 6 caracteres. Te recomendamos combinar letras y números.</p>
        <div class="form-group" style="margin-bottom:1rem">
          <label class="form-label">Nueva contraseña</label>
          <div style="position:relative">
            <span style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input id="rec-pass1" type="password" class="form-control" placeholder="••••••••••"
                   style="padding-left:2.5rem" autocomplete="new-password">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:1.25rem">
          <label class="form-label">Confirmar contraseña</label>
          <div style="position:relative">
            <span style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input id="rec-pass2" type="password" class="form-control" placeholder="••••••••••"
                   style="padding-left:2.5rem" autocomplete="new-password">
          </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" id="btn-step-3" onclick="submitPassword()">Guardar nueva contraseña</button>
      </div>

      <div id="step-done" style="display:none;text-align:center">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--accent-light);border:3px solid var(--accent);
             display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 class="auth-card-title">¡Contraseña actualizada!</h2>
        <p class="auth-card-sub" style="margin-bottom:1.25rem">Tu contraseña se cambió correctamente. Ya puedes iniciar sesión con tus nuevas credenciales.</p>
        <button class="btn btn-primary btn-block btn-lg" onclick="window.location.href='login.html'">Ir a Iniciar Sesión</button>
      </div>

      <p class="auth-footer"><a href="login.html" class="auth-link">← Volver a Iniciar Sesión</a></p>
    </div>
  </div>
</div>

<script src="js/store.js"></script>
<script src="js/api.js"></script>
<script src="js/ui.js"></script>
<script src="js/icons.js"></script>
<script>

const existing = Store.Auth.session();
if (existing) {
  window.location.href = existing.rol === 'admin'
    ? 'views/dashboard-admin.html' : 'views/dashboard-cliente.html';
}

let recEmail = '';

function showAlert(msg, type = 'error') {
  const box = document.getElementById('rec-alert');
  box.className = `alert alert-${type}`;
  box.style.display = 'flex';
  box.innerHTML = `
    <span class="alert-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </span>
    <div class="alert-content">${msg}</div>`;
}
function hideAlert() {
  document.getElementById('rec-alert').style.display = 'none';
}

function goToStep(n) {
  hideAlert();
  ['step-1','step-2','step-3','step-done'].forEach(id => document.getElementById(id).style.display = 'none');
  document.getElementById(n === 4 ? 'step-done' : `step-${n}`).style.display = 'block';
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`step-dot-${i}`);
    dot.classList.toggle('active', i === n);
    dot.classList.toggle('done',   i < n || n === 4);
  }
  document.getElementById('step-line-1').classList.toggle('done', n >= 2);
  document.getElementById('step-line-2').classList.toggle('done', n >= 3);
}

async function submitEmail() {
  hideAlert();
  const email = document.getElementById('rec-email').value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert('Ingresa un correo electrónico válido.');
    return;
  }
  const btn = document.getElementById('btn-step-1');
  btn.disabled = true; btn.textContent = 'Enviando...';

  const result = await Store.Auth.requestReset(email);
  btn.disabled = false; btn.textContent = 'Enviar código';
  if (result.error) { showAlert(result.error); return; }

  recEmail = email;
  document.getElementById('rec-email-echo').textContent = email;

  document.getElementById('demo-code').textContent = result.code;
  goToStep(2);
  document.getElementById('rec-code').focus();
}

async function submitCode() {
  hideAlert();
  const code = document.getElementById('rec-code').value.trim();
  if (!/^\d{6}$/.test(code)) {
    showAlert('El código debe tener exactamente 6 dígitos.');
    return;
  }
  const result = await Store.Auth.verifyResetCode(recEmail, code);
  if (result.error) { showAlert(result.error); return; }
  goToStep(3);
  document.getElementById('rec-pass1').focus();
}

async function resendCode() {
  const result = await Store.Auth.requestReset(recEmail);
  if (result.error) { showAlert(result.error); return; }
  document.getElementById('demo-code').textContent = result.code;
  document.getElementById('rec-code').value = '';
  UI.toast('Código reenviado. Revisa tu correo.', 'info');
}

async function submitPassword() {
  hideAlert();
  const p1 = document.getElementById('rec-pass1').value;
  const p2 = document.getElementById('rec-pass2').value;
  if (p1.length < 6) { showAlert('La contraseña debe tener al menos 6 caracteres.'); return; }
  if (p1 !== p2)     { showAlert('Las contraseñas no coinciden.'); return; }

  const code = document.getElementById('rec-code').value.trim();
  const btn  = document.getElementById('btn-step-3');
  btn.disabled = true; btn.textContent = 'Guardando...';

  const result = await Store.Auth.resetPassword(recEmail, code, p1);
  btn.disabled = false; btn.textContent = 'Guardar nueva contraseña';
  if (result.error) { showAlert(result.error); return; }
  goToStep(4);
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (document.getElementById('step-1').style.display !== 'none') submitEmail();
  else if (document.getElementById('step-2').style.display !== 'none') submitCode();
  else if (document.getElementById('step-3').style.display !== 'none') submitPassword();
});

</script>
</body>
</html>
