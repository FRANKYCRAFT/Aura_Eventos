

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {

  --sidebar-bg:      #0F172A;
  --sidebar-hover:   rgba(255,255,255,.07);
  --sidebar-active:  rgba(16,185,129,.15);
  --sidebar-text:    #94A3B8;
  --sidebar-text2:   #CBD5E1;
  --sidebar-border:  rgba(255,255,255,.08);
  --sidebar-w:       220px;

  --page-bg:         #F8FAFC;
  --card-bg:         #FFFFFF;
  --card-border:     #E2E8F0;
  --card-shadow:     0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05);
  --card-shadow-md:  0 4px 16px rgba(0,0,0,.1);

  --text-primary:    #0F172A;
  --text-secondary:  #475569;
  --text-muted:      #94A3B8;
  --text-xmuted:     #CBD5E1;

  --accent:          #10B981;
  --accent-dark:     #059669;
  --accent-light:    #D1FAE5;
  --accent-dim:      rgba(16,185,129,.10);

  --danger:          #EF4444;
  --danger-light:    #FEE2E2;
  --warn:            #F59E0B;
  --warn-light:      #FEF3C7;
  --info:            #3B82F6;
  --info-light:      #DBEAFE;
  --success:         #10B981;
  --success-light:   #D1FAE5;

  --radius:          10px;
  --radius-sm:       6px;
  --radius-lg:       14px;
  --transition:      .16s ease;
  --font:            'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font);
  background: var(--page-bg);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a  { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
ul, ol { list-style: none; }
button { font-family: inherit; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
  padding: .55rem 1.125rem; border-radius: var(--radius-sm); border: none;
  font-size: .875rem; font-weight: 600; cursor: pointer;
  transition: var(--transition); white-space: nowrap; user-select: none;
  line-height: 1.4;
}
.btn:disabled { opacity: .5; cursor: not-allowed; }

.btn-primary  { background: var(--accent); color: #fff; }
.btn-primary:hover:not(:disabled) { background: var(--accent-dark); box-shadow: 0 3px 12px rgba(16,185,129,.35); transform: translateY(-1px); }

.btn-danger   { background: var(--danger); color: #fff; }
.btn-danger:hover:not(:disabled) { background: #DC2626; }

.btn-ghost    { background: transparent; color: var(--text-secondary); border: 1px solid var(--card-border); }
.btn-ghost:hover:not(:disabled) { background: #F1F5F9; color: var(--text-primary); }

.btn-outline  { background: transparent; color: var(--accent); border: 1.5px solid var(--accent); }
.btn-outline:hover:not(:disabled) { background: var(--accent-dim); }

.btn-sm   { padding: .35rem .8rem; font-size: .8125rem; }
.btn-lg   { padding: .75rem 1.5rem; font-size: 1rem; }
.btn-block{ width: 100%; }
.btn-icon { padding: .45rem; width: 34px; height: 34px; flex-shrink: 0; }

.form-group { display: flex; flex-direction: column; gap: .3rem; }
.form-label { font-size: .8125rem; font-weight: 600; color: var(--text-secondary); }

.form-control {
  background: #FFFFFF;
  border: 1.5px solid #CBD5E1;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: .9375rem;
  font-family: var(--font);
  padding: .6rem .875rem;
  transition: var(--transition);
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
}
.form-control::placeholder { color: #94A3B8; }
.form-control:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(16,185,129,.15);
}
.form-control:hover:not(:focus) { border-color: #94A3B8; }
.form-control.error { border-color: var(--danger); box-shadow: 0 0 0 3px rgba(239,68,68,.12); }

select.form-control {
  background-color: #FFFFFF;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right .75rem center;
  padding-right: 2.25rem;
  cursor: pointer;
}
select.form-control:focus { border-color: var(--accent); }
select.form-control option {
  background: #FFFFFF;
  color: var(--text-primary);
  font-size: .9375rem;
}
select.form-control option:checked  { background: var(--accent-light); color: var(--text-primary); }
select.form-control option:disabled { color: #94A3B8; }

textarea.form-control { resize: vertical; min-height: 80px; }

.form-row   { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-error { font-size: .78rem; color: var(--danger); margin-top: .15rem; }

.file-upload-area {
  border: 2px dashed #CBD5E1;
  border-radius: var(--radius);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  background: #F8FAFC;
  position: relative;
  overflow: hidden;
}
.file-upload-area:hover, .file-upload-area.dragover {
  border-color: var(--accent);
  background: var(--accent-dim);
}

.file-upload-area input[type="file"] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
  font-size: 0;
}
.file-upload-area .upload-placeholder {
  position: relative;
  z-index: 1;
  pointer-events: none;
}
.file-upload-wrap { position: relative; }
.file-preview {
  width: 100%; height: 160px; object-fit: cover;
  border-radius: var(--radius-sm); border: 1px solid var(--card-border);
  display: block;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
  padding: 1.25rem;
}
.card-sm { padding: .875rem; }

.badge {
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .2rem .625rem; border-radius: 99px;
  font-size: .75rem; font-weight: 700; letter-spacing: .02em;
}
.badge-pending   { background: var(--warn-light);    color: #92400E; }
.badge-approved  { background: var(--success-light); color: #065F46; }
.badge-rejected  { background: var(--danger-light);  color: #991B1B; }
.badge-low       { background: var(--warn-light);    color: #92400E; }
.badge-disabled  { background: #F1F5F9;              color: #64748B; }
.badge-cat       { background: var(--accent-dim);    color: #065F46; border: 1px solid var(--accent-light); }

.avatar {
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: #fff; font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: .75rem;
}

.alert {
  display: flex; gap: .75rem; align-items: flex-start;
  padding: .875rem 1rem; border-radius: var(--radius-sm);
  font-size: .875rem;
}
.alert-icon    { flex-shrink: 0; margin-top: 1px; }
.alert-content { flex: 1; color: inherit; }
.alert-title   { font-weight: 700; margin-bottom: .1rem; }
.alert-cta     { flex-shrink: 0; }
.alert-error   { background: var(--danger-light); border: 1px solid #FECACA; color: #991B1B; }
.alert-warn    { background: var(--warn-light);   border: 1px solid #FDE68A; color: #92400E; }
.alert-success { background: var(--success-light);border: 1px solid #A7F3D0; color: #065F46; }
.alert-info    { background: var(--info-light);   border: 1px solid #BFDBFE; color: #1D4ED8; }

.divider { height: 1px; background: var(--card-border); margin: 1rem 0; }

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(15,23,42,.55);
  z-index: 8000;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  opacity: 0; transition: opacity .2s;
  backdrop-filter: blur(3px);
}
.modal-overlay.active { opacity: 1; }

.modal-box {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  width: 100%; max-width: 500px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
  animation: fadeIn .18s ease;
}
.modal-box-lg { max-width: 740px; }
.modal-box-xl { max-width: 860px; }

.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid var(--card-border);
}
.modal-title  { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
.modal-close  {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); padding: .3rem; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}
.modal-close:hover { background: #F1F5F9; color: var(--text-primary); }
.modal-body   { padding: 1.5rem; }
.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--card-border);
  display: flex; justify-content: flex-end; gap: .625rem;
}

.app-layout   { display: flex; min-height: 100vh; }
.main-content { margin-left: var(--sidebar-w); flex: 1; background: var(--page-bg); }

.sidebar {
  width: var(--sidebar-w);
  background: var(--sidebar-bg);
  position: fixed; top: 0; left: 0; height: 100vh;
  overflow-y: auto; z-index: 100;
  display: flex; flex-direction: column;
  border-right: 1px solid var(--sidebar-border);
}

.sidebar-logo-wrap {
  padding: 1.125rem 1rem 1rem;
  border-bottom: 1px solid var(--sidebar-border);
}
.sidebar-logo {
  max-width: 140px; height: auto; display: block;
}
.sidebar-logo-fallback {
  display: flex; align-items: center; gap: .5rem;
}
.logo-mark {
  width: 28px; height: 28px; border-radius: 6px;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: .875rem; font-weight: 800; color: #fff; flex-shrink: 0;
}
.logo-text       { font-size: .9375rem; font-weight: 800; color: #F8FAFC; letter-spacing: -.01em; }
.logo-text span  { color: var(--accent); }

.sidebar-role-tag {
  padding: .625rem 1rem .25rem;
  font-size: .68rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: #475569;
}

.sidebar-section { padding: .5rem .625rem; flex: 1; }
.sidebar-label {
  font-size: .67rem; font-weight: 700; letter-spacing: .1em;
  color: #475569; text-transform: uppercase;
  padding: .5rem .5rem .25rem; display: block;
}

.sidebar-link {
  display: flex; align-items: center; gap: .6rem;
  padding: .5rem .625rem; border-radius: var(--radius-sm);
  color: var(--sidebar-text); font-size: .875rem; font-weight: 500;
  transition: var(--transition); cursor: pointer;
  border: none; background: none; width: 100%;
  text-decoration: none; margin-bottom: 1px;
}
.sidebar-link:hover  { background: var(--sidebar-hover); color: var(--sidebar-text2); }
.sidebar-link.active { background: var(--sidebar-active); color: var(--accent); font-weight: 600; }
.sidebar-link svg    { flex-shrink: 0; }
.badge-count {
  margin-left: auto; background: var(--danger); color: #fff;
  font-size: .68rem; font-weight: 800; padding: .1rem .4rem;
  border-radius: 99px; line-height: 1.5;
}

.sidebar-footer {
  margin-top: auto; padding: .75rem .625rem;
  border-top: 1px solid var(--sidebar-border);
}
.sidebar-user {
  display: flex; align-items: center; gap: .625rem;
  padding: .5rem .625rem; border-radius: var(--radius-sm);
  cursor: pointer; transition: var(--transition);
}
.sidebar-user:hover { background: var(--sidebar-hover); }
.sidebar-user-info  { flex: 1; min-width: 0; }
.sidebar-user-name  { font-size: .8125rem; font-weight: 600; color: var(--sidebar-text2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-user-role  { font-size: .72rem; color: #475569; }

.sidebar-logout-btn {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: var(--radius-sm);
  flex-shrink: 0; color: var(--sidebar-text);
  transition: var(--transition);
}
.sidebar-logout-icon { flex-shrink: 0; pointer-events: none; }
.sidebar-user:hover .sidebar-logout-btn {
  background: rgba(239,68,68,.16);
  color: #FCA5A5;
}
.sidebar-user:active .sidebar-logout-btn { background: rgba(239,68,68,.28); color: #fff; }

.page-header {
  padding: 1.5rem 2rem 0;
  background: var(--page-bg);
}
.page-title    { font-size: 1.375rem; font-weight: 800; color: var(--text-primary); }
.page-subtitle { font-size: .875rem; color: var(--text-muted); margin-top: .2rem; }
.page-body     { padding: 1.25rem 2rem 2rem; }

.topnav {
  display: flex; align-items: center; gap: 1.25rem;
  padding: .75rem 2rem;
  background: var(--sidebar-bg);
  position: sticky; top: 0; z-index: 50;
  border-bottom: 1px solid var(--sidebar-border);
}
.topnav-logo { display: flex; align-items: center; gap: .5rem; margin-right: auto; cursor: pointer; }
.topnav-links { display: flex; gap: .25rem; }
.nav-link {
  padding: .4rem .875rem; border-radius: var(--radius-sm);
  color: var(--sidebar-text); font-size: .875rem; font-weight: 500;
  transition: var(--transition);
}
.nav-link:hover  { color: #F8FAFC; background: var(--sidebar-hover); }
.nav-link.active { color: var(--accent); font-weight: 600; }
.topnav-actions { display: flex; align-items: center; gap: .625rem; }
.cart-btn       { position: relative; color: var(--sidebar-text) !important; border-color: var(--sidebar-border) !important; }
.cart-btn:hover { color: #F8FAFC !important; }
.cart-badge {
  position: absolute; top: -5px; right: -5px;
  background: var(--accent); color: #fff;
  font-size: .65rem; font-weight: 800; width: 18px; height: 18px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
}
.search-input-wrap { position: relative; }
.search-input-wrap input {
  background: rgba(255,255,255,.08); border: 1px solid var(--sidebar-border);
  border-radius: 99px; padding: .4rem .875rem .4rem 2.1rem;
  color: #F8FAFC; font-size: .875rem; width: 190px; transition: var(--transition);
  font-family: var(--font);
}
.search-input-wrap input::placeholder { color: #64748B; }
.search-input-wrap input:focus { outline: none; border-color: var(--accent); width: 240px; background: rgba(255,255,255,.12); }
.search-icon { position: absolute; left: .7rem; top: 50%; transform: translateY(-50%); color: #64748B; pointer-events: none; }

.user-dropdown {
  position: absolute; right: 0; top: calc(100% + 8px);
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius); min-width: 196px;
  box-shadow: var(--card-shadow-md); z-index: 200; overflow: hidden;
  display: none;
}
.user-dropdown.open { display: block; animation: fadeIn .14s ease; }
.dropdown-header { padding: .75rem 1rem; border-bottom: 1px solid var(--card-border); background: #F8FAFC; }
.dropdown-item {
  display: flex; align-items: center; gap: .5rem;
  padding: .5rem 1rem; font-size: .875rem; color: var(--text-secondary);
  cursor: pointer; transition: var(--transition); background: none; border: none;
  width: 100%; text-align: left; font-family: var(--font); text-decoration: none;
}
.dropdown-item:hover { background: #F1F5F9; color: var(--text-primary); }
.dropdown-item.danger { color: var(--danger); }
.dropdown-item.danger:hover { background: var(--danger-light); }
.dropdown-divider { height: 1px; background: var(--card-border); margin: .25rem 0; }

.auth-layout { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
.auth-panel  { padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; }
.auth-hero   {
  background: linear-gradient(145deg, #0b1526 0%, #162240 60%, #0a1e38 100%);
  position: relative; overflow: hidden;
}
.auth-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 110%, rgba(16,185,129,.18), transparent 70%);
}
.auth-hero-content { position: relative; z-index: 1; }
.auth-eyebrow  { font-size: .72rem; font-weight: 700; letter-spacing: .15em; color: var(--accent); text-transform: uppercase; margin-bottom: .875rem; display: block; }
.auth-tagline  { font-size: clamp(1.875rem, 3.5vw, 2.625rem); font-weight: 800; line-height: 1.15; color: #F8FAFC; margin-bottom: .875rem; }
.auth-desc     { color: #94A3B8; font-size: .9375rem; line-height: 1.6; max-width: 380px; }
.auth-stats    { display: flex; gap: 2rem; margin-top: 2rem; }
.auth-stat-val { font-size: 1.375rem; font-weight: 800; color: var(--accent); }
.auth-stat-label { font-size: .8125rem; color: #64748B; }
.auth-form-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius-lg); padding: 2rem;
  max-width: 440px; width: 100%; margin: 0 auto;
  box-shadow: var(--card-shadow-md);
}
.auth-logo      { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; }

.auth-logo .logo-text      { color: var(--text-primary); font-size: 1.0625rem; }
.auth-logo .logo-text span { color: var(--accent); }
.auth-logo .logo-mark      { width: 32px; height: 32px; font-size: 1rem; }
.auth-card-title{ font-size: 1.375rem; font-weight: 800; margin-bottom: .25rem; color: var(--text-primary); }
.auth-card-sub  { font-size: .875rem; color: var(--text-muted); margin-bottom: 1.75rem; }
.auth-link      { color: var(--accent); font-weight: 600; cursor: pointer; }
.auth-link:hover{ text-decoration: underline; }
.auth-footer    { text-align: center; margin-top: 1rem; font-size: .875rem; color: var(--text-muted); }
.divider-or     { display: flex; align-items: center; gap: .75rem; margin: 1rem 0; color: var(--text-muted); font-size: .8125rem; }
.divider-or::before, .divider-or::after { content: ''; flex: 1; height: 1px; background: var(--card-border); }
.btn-google     { background: var(--card-bg); border: 1.5px solid var(--card-border); color: var(--text-primary); }
.btn-google:hover { background: #F1F5F9; }
.check-group    { display: flex; align-items: flex-start; gap: .5rem; font-size: .875rem; color: var(--text-secondary); cursor: pointer; }
.check-group input { margin-top: 3px; accent-color: var(--accent); flex-shrink: 0; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem; margin-bottom: 1.25rem;
}
.stat-card  { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 1.25rem; box-shadow: var(--card-shadow); }
.stat-icon  { width: 36px; height: 36px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; margin-bottom: .75rem; }
.stat-icon-green  { background: var(--accent-dim); color: var(--accent); }
.stat-icon-yellow { background: var(--warn-light);  color: #D97706; }
.stat-icon-red    { background: var(--danger-light); color: var(--danger); }
.stat-icon-blue   { background: var(--info-light);   color: var(--info); }
.stat-icon-gray   { background: #F1F5F9; color: #64748B; }
.stat-value { font-size: 1.625rem; font-weight: 800; color: var(--text-primary); margin-bottom: .15rem; }
.stat-label { font-size: .8125rem; color: var(--text-muted); }
.stat-sub   { font-size: .8125rem; margin-top: .3rem; font-weight: 500; }
.stat-up    { color: var(--accent); }
.stat-warn  { color: var(--warn); }
.stat-danger{ color: var(--danger); }

.table-wrap { overflow-x: auto; }
.table      { width: 100%; border-collapse: collapse; font-size: .875rem; }
.table th   {
  padding: .75rem 1rem; text-align: left;
  font-size: .72rem; font-weight: 700; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: .06em;
  background: #F8FAFC; border-bottom: 1px solid var(--card-border);
  white-space: nowrap;
}
.table td   {
  padding: .875rem 1rem;
  border-bottom: 1px solid #F1F5F9;
  color: var(--text-secondary); vertical-align: middle;
}
.table tbody tr:hover td { background: #FAFAFA; }
.table tbody tr:last-child td { border-bottom: none; }
.checkbox-cell input[type="checkbox"] { accent-color: var(--accent); width: 15px; height: 15px; cursor: pointer; }

.catalog-tabs { display: flex; gap: .5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
.catalog-tab  {
  padding: .5rem 1.125rem; border-radius: var(--radius-sm);
  border: 1.5px solid var(--card-border);
  background: var(--card-bg); color: var(--text-secondary);
  font-size: .875rem; font-weight: 500; cursor: pointer; transition: var(--transition);
  display: flex; align-items: center; gap: .45rem;
}
.catalog-tab:hover  { border-color: var(--accent); color: var(--accent); }
.catalog-tab.active { background: var(--text-primary); color: #fff; border-color: var(--text-primary); }

.filter-bar   { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.125rem; }
.filter-chip  {
  padding: .35rem .875rem; border-radius: 99px;
  border: 1.5px solid var(--card-border);
  background: var(--card-bg); color: var(--text-secondary);
  font-size: .8125rem; cursor: pointer; transition: var(--transition);
  font-family: var(--font);
}
.filter-chip:hover  { border-color: var(--accent); color: var(--accent); }
.filter-chip.active { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 600; }

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.125rem;
}
.item-card {
  background: var(--card-bg); border: 1.5px solid var(--card-border);
  border-radius: var(--radius); overflow: hidden;
  transition: var(--transition); cursor: pointer;
  box-shadow: var(--card-shadow);
}
.item-card:hover        { border-color: var(--accent); transform: translateY(-2px); box-shadow: var(--card-shadow-md); }
.item-card.in-cart      { border-color: var(--accent); }
.item-card.no-stock     { opacity: .65; cursor: default; }
.item-card.no-stock:hover { transform: none; box-shadow: var(--card-shadow); }

.item-img {
  width: 100%; height: 200px; overflow: hidden;
  background: #F1F5F9; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.item-img img {
  width: 100%; height: 100%; object-fit: cover;
  display: block; transition: transform .3s ease;
}
.item-card:hover .item-img img { transform: scale(1.04); }
.item-img-placeholder { font-size: 3.5rem; }
.item-tag {
  position: absolute; top: .5rem; left: .5rem;
  background: rgba(255,255,255,.92); backdrop-filter: blur(4px);
  border-radius: 4px; padding: .15rem .5rem;
  font-size: .7rem; font-weight: 700; letter-spacing: .04em;
  color: var(--text-primary);
}
.item-tag-accent { color: var(--accent); }
.item-badge  { position: absolute; top: .5rem; right: .5rem; }

.item-body      { padding: .875rem; }
.item-category  { font-size: .72rem; color: var(--accent); text-transform: uppercase; letter-spacing: .06em; font-weight: 700; margin-bottom: .2rem; }
.item-name      { font-size: .9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: .25rem; line-height: 1.3; }
.item-desc      { font-size: .8125rem; color: var(--text-muted); line-height: 1.5; margin-bottom: .625rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.item-meta      { display: flex; align-items: center; gap: .5rem; font-size: .78rem; color: var(--text-muted); flex-wrap: wrap; margin-bottom: .625rem; }
.item-price     { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); }
.item-price span{ font-size: .75rem; font-weight: 400; color: var(--text-muted); }
.stock-ok   { color: var(--accent); font-weight: 600; }
.stock-low  { color: var(--warn);   font-weight: 600; }
.stock-none { color: var(--danger); font-weight: 600; }
.in-cart-mark {
  background: var(--accent-light); color: #065F46;
  text-align: center; font-size: .8125rem; font-weight: 600;
  padding: .4rem; border-radius: var(--radius-sm); margin-top: .5rem;
}

.product-modal { display: none; }
.product-modal.active { display: flex; }
.product-modal-inner { display: grid; grid-template-columns: 1fr 1fr; }
.product-modal-img   { background: #F1F5F9; display: flex; align-items: center; justify-content: center; min-height: 280px; overflow: hidden; }
.product-modal-img img { width: 100%; height: 100%; object-fit: cover; }
.product-modal-info  { padding: 1.5rem; display: flex; flex-direction: column; gap: .75rem; overflow-y: auto; max-height: 80vh; }
.product-specs { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
.product-spec  { background: #F8FAFC; border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: .5rem .75rem; }
.product-spec-label { font-size: .68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
.product-spec-val   { font-size: .8125rem; color: var(--text-secondary); font-weight: 500; margin-top: .1rem; }
.product-total      { font-size: 1.375rem; font-weight: 800; color: var(--text-primary); }
.product-total small{ font-size: .8125rem; font-weight: 400; color: var(--text-muted); }
.qty-ctrl { display: flex; align-items: center; gap: .625rem; }
.qty-btn  { width: 30px; height: 30px; border-radius: 6px; border: 1.5px solid var(--card-border); background: var(--card-bg); color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: var(--transition); }
.qty-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
.qty-val  { font-size: 1.125rem; font-weight: 700; min-width: 28px; text-align: center; color: var(--text-primary); }

.cart-overlay { display: none; position: fixed; inset: 0; z-index: 7000; }
.cart-overlay.open { display: block; }
.cart-backdrop { position: absolute; inset: 0; background: rgba(15,23,42,.5); }
.cart-drawer {
  position: absolute; right: 0; top: 0; height: 100%; width: 380px;
  background: var(--card-bg); border-left: 1px solid var(--card-border);
  display: flex; flex-direction: column; box-shadow: -4px 0 24px rgba(0,0,0,.1);
}
.cart-head  { padding: 1.125rem 1.25rem 1rem; border-bottom: 1px solid var(--card-border); display: flex; align-items: center; justify-content: space-between; }
.cart-head h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: .5rem; }
.cart-items { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: .75rem; }
.cart-item  { display: flex; gap: .875rem; align-items: flex-start; background: #F8FAFC; border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: .75rem; }
.cart-item-img { width: 52px; height: 52px; border-radius: 6px; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; overflow: hidden; }
.cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
.cart-item-info { flex: 1; min-width: 0; }
.cart-item-cat  { font-size: .68rem; color: var(--accent); text-transform: uppercase; font-weight: 700; letter-spacing: .05em; }
.cart-item-name { font-size: .875rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-item-price{ font-size: .9rem; font-weight: 700; color: var(--accent); margin-top: .15rem; }
.cart-item-actions { display: flex; align-items: center; gap: .4rem; margin-top: .35rem; }
.cart-item-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: .15rem; border-radius: 4px; display: flex; transition: var(--transition); }
.cart-item-remove:hover { color: var(--danger); background: var(--danger-light); }
.cart-footer   { padding: 1rem 1.25rem; border-top: 1px solid var(--card-border); background: #F8FAFC; }
.cart-summary-row { display: flex; justify-content: space-between; font-size: .875rem; color: var(--text-secondary); margin-bottom: .35rem; }
.cart-total-row   { display: flex; justify-content: space-between; font-weight: 800; font-size: 1rem; color: var(--text-primary); margin: .5rem 0 1rem; }
.cart-empty       { text-align: center; padding: 3rem 1.5rem; color: var(--text-muted); }
.cart-empty-icon  { font-size: 2.5rem; margin-bottom: .75rem; }

.calendar-wrap  { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 1.25rem; box-shadow: var(--card-shadow); }
.cal-header     { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.cal-month      { font-weight: 700; font-size: 1rem; color: var(--text-primary); }
.cal-nav        { background: none; border: 1.5px solid var(--card-border); border-radius: var(--radius-sm); color: var(--text-secondary); cursor: pointer; padding: .3rem .6rem; font-size: 1rem; transition: var(--transition); }
.cal-nav:hover  { border-color: var(--accent); color: var(--accent); }
.cal-grid       { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.cal-dow        { text-align: center; font-size: .7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; padding-bottom: .5rem; }
.cal-day        { text-align: center; padding: .5rem .25rem; border-radius: var(--radius-sm); font-size: .875rem; cursor: pointer; transition: var(--transition); color: var(--text-primary); }
.cal-day:hover:not(.disabled):not(.empty) { background: var(--accent-dim); color: var(--accent); }
.cal-day.today    { font-weight: 700; border: 1.5px solid var(--card-border); }
.cal-day.selected { background: var(--accent); color: #fff; font-weight: 700; }
.cal-day.in-range { background: var(--accent-light); color: #065F46; }
.cal-day.disabled { color: #CBD5E1; cursor: default; text-decoration: line-through; }
.cal-day.empty    { cursor: default; }
.cal-legend { display: flex; gap: 1rem; margin-top: .875rem; flex-wrap: wrap; }
.cal-legend-item { display: flex; align-items: center; gap: .35rem; font-size: .78rem; color: var(--text-muted); }
.cal-legend-dot  { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }

.booking-layout  { display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start; }
.booking-panel   { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--card-shadow); }
.booking-sidebar { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 1.25rem; position: sticky; top: 80px; box-shadow: var(--card-shadow); }
.booking-sidebar-title { font-size: .72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: .875rem; }
.summary-item      { display: flex; align-items: center; gap: .75rem; margin-bottom: .75rem; }
.summary-item-img  { width: 40px; height: 40px; border-radius: 6px; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; overflow: hidden; }
.summary-item-img img { width: 100%; height: 100%; object-fit: cover; }
.summary-item-info { flex: 1; min-width: 0; }
.summary-item-name { font-size: .875rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.summary-item-meta { font-size: .78rem; color: var(--text-muted); }
.summary-item-price{ font-size: .9rem; font-weight: 700; color: var(--accent); flex-shrink: 0; }
.summary-totals    { border-top: 1px solid var(--card-border); padding-top: .75rem; margin-top: .5rem; }
.summary-row       { display: flex; justify-content: space-between; font-size: .875rem; color: var(--text-secondary); margin-bottom: .35rem; }
.summary-total     { display: flex; justify-content: space-between; font-weight: 800; font-size: 1.0625rem; color: var(--text-primary); margin-top: .5rem; padding-top: .5rem; border-top: 1px solid var(--card-border); }
.summary-date-badge{ background: #F8FAFC; border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: .625rem .875rem; margin-top: .875rem; }
.summary-date-label{ color: var(--text-muted); font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: .2rem; }
.summary-date-val  { font-weight: 700; color: var(--text-primary); font-size: .875rem; }

.review-layout       { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.review-section-title{ font-size: .7rem; font-weight: 700; letter-spacing: .1em; color: var(--text-muted); text-transform: uppercase; margin-bottom: .625rem; }
.review-field        { margin-bottom: .5rem; font-size: .875rem; }
.review-field strong { display: block; font-size: .75rem; color: var(--text-muted); font-weight: 600; margin-bottom: .1rem; }
.review-field span   { color: var(--text-primary); }
.financial-summary   { background: #F8FAFC; border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: .875rem 1rem; }
.fin-row  { display: flex; justify-content: space-between; font-size: .875rem; color: var(--text-secondary); padding: .2rem 0; }
.fin-total{ display: flex; justify-content: space-between; font-weight: 800; font-size: 1rem; color: var(--accent); padding-top: .5rem; border-top: 1px solid var(--card-border); margin-top: .3rem; }

.progress-bar  { height: 4px; background: #E2E8F0; border-radius: 99px; margin-top: 4px; }
.progress-fill { height: 100%; border-radius: 99px; transition: width .4s ease; }

.chart-wrap    { display: flex; align-items: flex-end; gap: 6px; height: 100px; padding-bottom: 4px; }
.chart-col     { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
.chart-bar     {
  width: 100%; border-radius: 4px 4px 0 0;
  background: #E2E8F0; min-height: 6px;
  transition: height .4s ease, background .2s;
  cursor: pointer; position: relative;
}
.chart-bar:hover { filter: brightness(.92); }
.chart-bar.current { background: var(--accent); box-shadow: 0 -2px 8px rgba(16,185,129,.3); }
.chart-bar.prev    { background: #BFDBFE; }
.chart-bar-tooltip {
  display: none; position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
  background: var(--text-primary); color: #fff; font-size: .72rem; font-weight: 700;
  padding: .25rem .5rem; border-radius: 4px; white-space: nowrap; z-index: 10;
}
.chart-bar:hover .chart-bar-tooltip { display: block; }
.chart-label { font-size: .65rem; color: var(--text-muted); font-weight: 500; }

.pagination { display: flex; align-items: center; gap: .3rem; }
.page-btn   { width: 32px; height: 32px; border-radius: var(--radius-sm); border: 1.5px solid var(--card-border); background: var(--card-bg); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: .875rem; transition: var(--transition); }
.page-btn:hover  { border-color: var(--accent); color: var(--accent); }
.page-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 700; }
.page-btn:disabled { opacity: .4; cursor: default; }

.empty-state      { text-align: center; padding: 3rem 1.5rem; }
.empty-state-icon { font-size: 2.5rem; margin-bottom: .75rem; }
.empty-state h3   { color: var(--text-primary); font-size: 1rem; margin-bottom: .35rem; }
.empty-state p    { color: var(--text-muted); font-size: .875rem; }

.success-icon { width: 60px; height: 60px; border-radius: 50%; background: var(--accent-light); border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; color: var(--accent); }
.success-details   { background: #F8FAFC; border: 1px solid var(--card-border); border-radius: var(--radius-sm); padding: 1rem; text-align: left; }
.success-row       { display: flex; justify-content: space-between; font-size: .875rem; padding: .3rem 0; border-bottom: 1px solid var(--card-border); }
.success-row:last-child { border-bottom: none; }
.success-row .label{ color: var(--text-muted); }
.success-row .val  { font-weight: 600; color: var(--text-primary); }

.remision-doc       { background: #fff; color: var(--text-primary); border-radius: var(--radius); padding: 2rem; font-size: .875rem; }
.remision-header    { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid var(--text-primary); }
.remision-logo-text { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); }
.remision-logo-text span { color: var(--accent); }
.remision-contact   { font-size: .75rem; color: #64748B; margin-top: .25rem; }
.remision-title h2  { font-size: 1.25rem; font-weight: 800; text-align: right; letter-spacing: .04em; }
.remision-id        { font-size: .875rem; color: #64748B; text-align: right; }
.remision-status    { display: inline-block; margin-top: .35rem; padding: .2rem .6rem; border-radius: 4px; font-size: .75rem; font-weight: 700; text-align: right; }
.remision-status.aprobado { background: var(--accent-light); color: #065F46; }
.remision-status.pendiente{ background: var(--warn-light);   color: #92400E; }
.remision-grid           { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
.remision-section-label  { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #94A3B8; margin-bottom: .5rem; }
.remision-field          { margin-bottom: .3rem; font-size: .875rem; }
.remision-field strong   { color: #64748B; font-weight: 500; }
.remision-table          { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
.remision-table th       { background: var(--text-primary); color: #fff; padding: .625rem .875rem; font-size: .72rem; text-transform: uppercase; letter-spacing: .05em; text-align: left; }
.remision-table td       { padding: .75rem .875rem; border-bottom: 1px solid #E2E8F0; font-size: .875rem; vertical-align: top; }
.remision-table tr:last-child td { border-bottom: none; }
.remision-code           { font-family: monospace; font-size: .75rem; color: var(--accent); font-weight: 700; }
.remision-totals         { display: grid; grid-template-columns: 1fr 220px; gap: 2rem; }
.remision-notes li       { font-size: .8125rem; color: #64748B; margin-bottom: .3rem; padding-left: .75rem; position: relative; }
.remision-notes li::before { content: '·'; position: absolute; left: 0; }
.remision-total-table    { background: #F8FAFC; border-radius: 6px; padding: .875rem; }
.remision-total-row      { display: flex; justify-content: space-between; font-size: .875rem; color: #64748B; padding: .2rem 0; }
.remision-total-final    { display: flex; justify-content: space-between; font-weight: 800; font-size: 1.125rem; padding: .5rem 0 0; border-top: 2px solid var(--text-primary); margin-top: .35rem; }
.remision-footer         { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #E2E8F0; }
.remision-sign-label     { font-size: .68rem; color: #94A3B8; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 1.5rem; }
.remision-sign-name      { font-size: .8125rem; font-weight: 600; border-top: 1px solid #CBD5E1; padding-top: .35rem; }

@keyframes fadeIn   { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
@keyframes toastIn  { from { transform:translateX(110%); opacity:0; } to { transform:translateX(0); opacity:1; } }
@keyframes toastOut { from { transform:translateX(0); opacity:1;  } to { transform:translateX(110%); opacity:0; } }
@keyframes spin     { to   { transform:rotate(360deg); } }
.spinner { width:26px; height:26px; border:3px solid #E2E8F0; border-top-color:var(--accent); border-radius:50%; animation:spin .7s linear infinite; }

@media (max-width:960px) {
  .auth-layout    { grid-template-columns:1fr; }
  .auth-hero      { display:none; }
  .booking-layout { grid-template-columns:1fr; }
  .review-layout  { grid-template-columns:1fr; }
  .product-modal-inner { grid-template-columns:1fr; }
  .remision-grid  { grid-template-columns:1fr; }
  .remision-totals{ grid-template-columns:1fr; }
  .remision-footer{ grid-template-columns:1fr; }
}
@media (max-width:768px) {
  :root { --sidebar-w:0px; }
  .sidebar      { transform:translateX(-100%); transition:transform .25s ease; width:220px; }
  .sidebar.open { transform:translateX(0); }
  .main-content { margin-left:0; }
  .form-row     { grid-template-columns:1fr; }
  .stats-grid   { grid-template-columns:1fr 1fr; }
  .items-grid   { grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
  .page-body, .page-header { padding-left:1rem; padding-right:1rem; }

  .topnav {
    flex-wrap: wrap;
    padding: .625rem 1rem;
    gap: .5rem .75rem;
  }
  .topnav-logo   { margin-right:auto; }
  .topnav-links  {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: .5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2px;
  }
  .topnav-links::-webkit-scrollbar { height: 0; }
  .nav-link      { white-space: nowrap; padding:.35rem .625rem; }
  .topnav-actions{ gap:.4rem; }
  .search-input-wrap { min-width: 0; }
  .search-input-wrap input { width: clamp(120px, 38vw, 220px); }

  .table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
  table       { min-width: 560px; }

  .modal-box  { max-width: 94vw; }
}
@media (max-width:480px) {
  .items-grid { grid-template-columns:1fr 1fr; }
  .cart-drawer{ width:100%; }
  .topnav     { padding:.5rem .75rem; }
  .stats-grid { grid-template-columns:1fr; }
  .page-title { font-size:1.5rem; }
  .nav-link   { font-size:.8125rem; }
  .search-input-wrap input { width: clamp(100px, 32vw, 160px); }
  .modal-footer .btn { flex:1; }
}

@media print {

  .sidebar, .topnav, .cart-drawer, .cart-btn,
  .btn, .search-input-wrap, .fab, .toast-container { display:none !important; }

  .main-content { margin-left:0 !important; width:100% !important; }
  .page-body, .page-header { padding:0 !important; }

  * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }

  .card, .stat-card { break-inside:avoid; page-break-inside:avoid; }

  body:has(.modal-overlay[style*="display: flex"]) .main-content,
  body:has(.modal-overlay[style*="display:flex"])  .main-content { display:none !important; }
  .modal-overlay { position:static; background:none; }
  .modal-box     { box-shadow:none; border:none; max-width:100%; }
  .modal-header, .modal-footer { display:none; }
}

.chart-container {
  position: relative;
  display: flex;
  gap: 0;
  align-items: stretch;
}

.chart-y-axis {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  padding-bottom: 28px;
  width: 44px;
  flex-shrink: 0;
}
.chart-y-label {
  font-size: .65rem;
  color: var(--text-muted);
  text-align: right;
  line-height: 1;
  padding-right: 6px;
  white-space: nowrap;
}

.chart-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}

.chart-body::before {
  content: "";
  position: absolute;
  left: 0;
  top: -4px;
  bottom: 28px;
  width: 2px;
  background: var(--text-secondary, #64748B);
  z-index: 3;
}
.chart-body::after {
  content: "";
  position: absolute;
  left: -3px;
  top: -8px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 8px solid var(--text-secondary, #64748B);
  z-index: 3;
}
.chart-x-axis {
  position: relative;
}
.chart-x-axis::after {
  content: "";
  position: absolute;
  right: -6px;
  top: -5px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 8px solid var(--text-secondary, #64748B);
}

.chart-gridlines {
  position: absolute;
  inset: 0;
  bottom: 28px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  pointer-events: none;
}
.chart-gridline {
  width: 100%;
  height: 1px;
  background: #F1F5F9;
}
.chart-gridline:first-child { background: #E2E8F0; }

.chart-bars-row {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 0 4px;
  position: relative;
  z-index: 1;
}

.chart-x-axis {
  display: flex;
  gap: 6px;
  padding: 6px 4px 0;
  border-top: 2px solid var(--text-secondary, #64748B);
}
.chart-x-label {
  flex: 1;
  text-align: center;
  font-size: .65rem;
  color: var(--text-muted);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
}

.chart-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
.chart-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: #BFDBFE;
  min-height: 4px;
  transition: height .4s ease, background .2s;
  cursor: pointer;
  position: relative;
}
.chart-bar:hover { filter: brightness(.9); }
.chart-bar.current { background: var(--accent); box-shadow: 0 -2px 8px rgba(16,185,129,.25); }
.chart-bar-tooltip {
  display: none;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--text-primary);
  color: #fff;
  font-size: .7rem;
  font-weight: 700;
  padding: .2rem .45rem;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 20;
  pointer-events: none;
}
.chart-bar-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--text-primary);
}
.chart-bar:hover .chart-bar-tooltip { display: block; }

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(.95) translateY(8px); }
  to   { opacity: 1; transform: scale(1)   translateY(0); }
}

.filters-panel-title {
  display: flex; align-items: center; gap: .45rem;
  font-size: .8125rem; font-weight: 800; color: var(--text-primary);
  text-transform: uppercase; letter-spacing: .06em;
  margin-bottom: .875rem; padding-bottom: .875rem;
  border-bottom: 1px solid var(--card-border);
}
.filters-panel-title svg { color: var(--accent); }

.filter-accordion { border-bottom: 1px solid var(--card-border); }
.filter-accordion:last-of-type { border-bottom: none; }

.filter-accordion-head {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  background: none; border: none; cursor: pointer;
  padding: .7rem .15rem; margin: 0;
  font-family: inherit; font-size: .72rem; font-weight: 700;
  color: var(--text-muted); text-transform: uppercase; letter-spacing: .07em;
  transition: var(--transition); border-radius: var(--radius-sm);
}
.filter-accordion-head:hover { color: var(--text-primary); }

.filter-accordion-arrow { transition: transform .2s ease; color: var(--text-muted); flex-shrink: 0; }
.filter-accordion.open  .filter-accordion-arrow { transform: rotate(180deg); color: var(--accent); }
.filter-accordion-head:hover .filter-accordion-arrow { color: var(--accent); }

.filter-accordion-body {
  overflow: hidden; max-height: 0;
  transition: max-height .28s ease, padding .28s ease;
}
.filter-accordion.open .filter-accordion-body { max-height: 600px; padding-bottom: .6rem; }

.filter-check {
  position: relative; display: flex; align-items: center; gap: .6rem;
  padding: .38rem .3rem; cursor: pointer; border-radius: var(--radius-sm);
  font-size: .8125rem; color: var(--text-secondary);
  transition: var(--transition); user-select: none;
}
.filter-check:hover { background: #F8FAFC; }

.filter-check input[type="checkbox"] {
  position: absolute; width: 1px; height: 1px;
  opacity: 0; pointer-events: none;
}

.filter-check-box {
  width: 17px; height: 17px; flex-shrink: 0; border-radius: 5px;
  border: 1.5px solid #CBD5E1; background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}
.filter-check-box::after {
  content: ''; width: 8px; height: 5px;
  border-left: 2px solid #fff; border-bottom: 2px solid #fff;
  transform: rotate(-45deg) scale(0); transition: transform .15s ease;
  margin-top: -1px;
}
.filter-check input:checked ~ .filter-check-box {
  background: var(--accent); border-color: var(--accent);
}
.filter-check input:checked ~ .filter-check-box::after { transform: rotate(-45deg) scale(1); }
.filter-check input:focus-visible ~ .filter-check-box { box-shadow: 0 0 0 3px var(--accent-dim); }

.filter-check-label { flex: 1; min-width: 0; }

.filter-badge {
  flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; padding: .1rem .4rem; border-radius: 99px;
  font-size: .68rem; font-weight: 800; background: #F1F5F9; color: var(--text-secondary);
}
.filter-badge-warn    { background: var(--warn-light);    color: #92400E; }
.filter-badge-success { background: var(--success-light); color: #065F46; }
.filter-badge-danger  { background: var(--danger-light);  color: #991B1B; }

.filter-clear-btn { margin-top: .875rem; }
.filter-clear-btn svg { transition: transform .3s ease; }
.filter-clear-btn:hover svg { transform: rotate(-90deg); }

.recovery-stepper {
  display: flex; align-items: center; gap: .5rem;
  margin-bottom: 1.5rem;
}
.recovery-step {
  display: flex; align-items: center; gap: .4rem;
  font-size: .72rem; font-weight: 700; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: .05em; white-space: nowrap;
}
.recovery-step span {
  width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
  border: 1.5px solid var(--card-border); background: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: .72rem; font-weight: 800; color: var(--text-muted);
  transition: var(--transition);
}
.recovery-step.active { color: var(--text-primary); }
.recovery-step.active span { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
.recovery-step.done span   { border-color: var(--accent); background: var(--accent); color: #fff; }
.recovery-step-line {
  flex: 1; height: 2px; background: var(--card-border); border-radius: 99px;
  transition: var(--transition); min-width: 12px;
}
.recovery-step-line.done { background: var(--accent); }

.recovery-code-input {
  text-align: center; font-size: 1.375rem; font-weight: 800;
  letter-spacing: .45em; padding-left: .45em;
}
