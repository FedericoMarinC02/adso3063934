// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api';
let authToken = localStorage.getItem('authToken');
let currentPetId = null;
let currentView = 'login';
let views = {};

// === Util para extraer el mensaje exacto de la API ===
function getApiMessage(data, fallback = '') {
    try {
        if (!data) return fallback;
        if (typeof data === 'string') return data;
        if (data.message) return String(data.message);
        if (data.error) return String(data.error);
        if (data.errors && typeof data.errors === 'object') {
            const firstKey = Object.keys(data.errors)[0];
            const val = data.errors[firstKey];
            if (Array.isArray(val)) return String(val[0]);
            if (val != null) return String(val);
        }
        return fallback;
    } catch (e) {
        return fallback;
    }
}

// ==================== MONITOR DE SEGURIDAD - DETECTAR CAMBIOS DE TOKEN ====================
let tokenMonitorizado = authToken;

// Crear proxy para detectar cambios en authToken
const handler = {
    set(target, property, value) {
        if (property === 'authToken') {
            console.warn('⚠️ ¡ALERTA DE SEGURIDAD! - Intento de modificar el token desde consola');
            
            // Si el token cambió de forma sospechosa
            if (value !== tokenMonitorizado && authToken !== value) {
                console.error('✗ TOKEN MODIFICADO - Cierre de sesión de seguridad');
                
                Swal.fire({
                    icon: 'error',
                    title: '⚠️ ALERTA DE SEGURIDAD',
                    text: 'Se detectó una modificación del token. Tu sesión se ha cerrado por seguridad.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    logout();
                });
                
                return false; // Rechazar el cambio
            }
        }
        return Reflect.set(target, property, value);
    }
};

// Monitorear cambios en la variable global
Object.defineProperty(window, 'authToken', {
    get() {
        return tokenMonitorizado;
    },
    set(value) {
        console.warn('⚠️ ¡ALERTA! - Intento de modificar authToken:', value);
        
        // Si intenta cambiar el token a algo diferente
        if (value !== tokenMonitorizado && value && String(value).trim() !== '') {
            console.error('✗ ACCESO DENEGADO - Cambio de token detectado');
            
            Swal.fire({
                icon: 'error',
                title: '⚠️ ALERTA DE SEGURIDAD',
                text: 'Se detectó un intento de modificación del token. Tu sesión se ha cerrado por seguridad.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Entendido'
            }).then(() => {
                tokenMonitorizado = null;
                localStorage.removeItem('authToken');
                currentView = 'login';
                showView();
            });
            
            return; // No permitir el cambio
        }
        
        // Si es un cambio válido (logout), permitir
        if (value === null || value === '') {
            tokenMonitorizado = value;
        }
    }
});

// ==================== VALIDAR TOKEN GLOBALMENTE ====================
async function apiCall(url, options = {}) {
    // ========== VALIDACIÓN DE TOKEN ==========
    const latestToken = localStorage.getItem('authToken');
    // Si el token en memoria difiere del de almacenamiento, cerrar sesión
    if (latestToken !== authToken) {
        console.error('✗ TOKEN MODIFICADO - Cierre de sesión');
        await logout();
        return null;
    }
    if (!latestToken || String(latestToken).trim() === '') {
        console.error('✗ SIN TOKEN - Cierre de sesión');
        await logout();
        return null;
    }

    // ========== CONFIGURAR HEADERS ==========
    if (!options.headers) {
        options.headers = {};
    }
    
    options.headers['Authorization'] = `Bearer ${latestToken}`;
    if (!options.headers['Accept']) {
        options.headers['Accept'] = 'application/json';
    }
    if ((options.method === 'POST' || options.method === 'PUT') && !options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(url, options);

        // ========== SI ES 401 = CIERRA SESIÓN ==========
        if (response.status === 401) {
            console.error('✗ ERROR 401: Token inválido - Cierre de sesión automático');
            let serverMessage = 'Unauthorized';
            try {
                const cloned = response.clone();
                try {
                    const data = await cloned.json();
                    serverMessage = getApiMessage(data, serverMessage);
                } catch (e) {
                    serverMessage = await cloned.text();
                }
            } catch (e) { /* ignore */ }
            try {
                Swal.fire({ 
                    icon: 'warning', 
                    title: '',
                    text: serverMessage || 'Unauthorized',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(() => {
                    logout();
                });
            } catch (_) {
                await logout();
            }
            return null;
        }

        return response;
        
    } catch (error) {
        console.error('✗ Error de conexión:', error);
        throw error;
    }
}

// ==================== INICIALIZAR CUANDO DOM ESTÉ LISTO ====================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('✓ DOM cargado');
    
    // Seleccionar vistas
    views = {
        login: document.getElementById('login'),
        dashboard: document.getElementById('dashboard'),
        add: document.getElementById('add'),
        edit: document.getElementById('edit'),
        show: document.getElementById('show')
    };
    
    console.log('► Vistas encontradas:', Object.keys(views));
    
    // Inicializar eventos
    setupLoginButton();
    setupNavigation();
    setupAddForm();
    setupEditForm();
    
    // Mostrar vista inicial
    if (authToken && String(authToken).trim() !== '') {
        console.log('✓ Token encontrado, verificando validez...');
        
        // Verificar si el token es válido - hacer una solicitud simple
        try {
            const testResponse = await fetch(`${API_BASE_URL}/pets/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json'
                }
            });
            
            if (testResponse.status === 401) {
                console.error('✗ Token inválido - Cierra sesión automática');
                logout();
                return;
            }
            
            if (testResponse.ok) {
                console.log('✓ Token válido - Cargando dashboard');
                currentView = 'dashboard';
                showView();
                await loadPets();
            } else {
                console.warn('⚠ Error al verificar token, mostrando login');
                currentView = 'login';
                showView();
            }
        } catch (error) {
            console.error('✗ Error verificando token:', error);
            currentView = 'login';
            showView();
        }
    } else {
        console.log('► Sin token - Mostrando login');
        currentView = 'login';
        showView();
    }
});

// ==================== LOGIN ====================
function setupLoginButton() {
    const btnLogin = document.querySelector('.btnLogin');
    
    if (btnLogin) {
        btnLogin.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('► Intentando login');
            
            try {
                const emailEl = document.getElementById('email');
                const passwordEl = document.getElementById('password');
                
                if (!emailEl || !passwordEl) {
                    console.error('✗ Campos de email o password no encontrados');
                    return;
                }
                
                const email = emailEl.value;
                const password = passwordEl.value;

                if (!email || !password) {
                    Swal.fire({ icon: 'warning', title: 'Validación fallida', text: 'Completa email y contrase��a' });
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok && data.token) {
                    authToken = data.token;
                    localStorage.setItem('authToken', authToken);
                    console.log('✓ Login exitoso');
                    // Mostrar SweetAlert con mensaje exacto de la API si existe
                    try { Swal.fire({ icon: 'success', title: data.message ? String(data.message) : '', text: '', toast: true, position: 'top-end', showConfirmButton: false, timer: 1200 }); } catch(e) {}
                    currentView = 'dashboard';
                    showView();
                    await loadPets();
                } else {
                    const msg = getApiMessage(data, '');
                    Swal.fire({ icon: 'error', title: '', text: msg || 'Error' });
                }
            } catch (error) {
                console.error('✗ Error en login:', error);
                Swal.fire({ icon: 'error', title: 'Error de conexión', text: error.message });
            }
        });
    }
}

// ==================== LOAD PETS ====================
async function loadPets() {
    try {
        console.log('✓ loadPets: Iniciando carga de mascotas');
        
        if (!authToken || authToken.trim() === '') {
            console.error('✗ loadPets: No hay token válido');
            currentView = 'login';
            showView();
            return;
        }
        
        console.log('✓ loadPets: Token presente:', authToken.substring(0, 10) + '...');
        
        const response = await apiCall(`${API_BASE_URL}/pets/list`, {
            method: 'GET'
        });

        if (!response) {
            console.error('✗ loadPets: apiCall retornó null (token inválido)');
            return;
        }
        
        const data = await response.json();
        console.log('✓ loadPets: Respuesta recibida:', data);

        if (response.ok) {
            // Extraer array de mascotas
            let pets = [];
            
            if (Array.isArray(data)) {
                pets = data;
            } else if (data.data && Array.isArray(data.data)) {
                pets = data.data;
            } else if (data.pets && Array.isArray(data.pets)) {
                pets = data.pets;
            } else {
                console.error('✗ loadPets: Formato desconocido:', data);
                pets = [];
            }
            
            console.log('✓ loadPets: Mascotas cargadas:', pets.length);
            renderPets(pets);
        } else {
            console.error('✗ loadPets: Error HTTP', response.status);
            const msg = getApiMessage(data, '');
            Swal.fire({ icon: 'error', title: '', text: msg || `Error ${response.status}` });
        }
    } catch (error) {
        console.error('✗ loadPets: Error:', error);
        Swal.fire({ icon: 'error', title: 'Error de conexión', text: error.message });
    }
}

// ==================== RENDER PETS ====================
function renderPets(pets) {
    try {
        const listContainer = document.querySelector('.list');
        if (!listContainer) {
            console.error('✗ Contenedor .list no encontrado');
            return;
        }

        // Validar que pets sea un array
        if (!Array.isArray(pets)) {
            console.error('✗ pets no es un array:', pets);
            listContainer.innerHTML = '<p>Error: formato de datos inválido</p>';
            return;
        }

        console.log('► Renderizando', pets.length, 'mascotas');
        listContainer.innerHTML = '';

        // Guardar lista en memoria para fallback cuando la API de detalle no responda
        try { window.allPets = pets; } catch(e) { /* ignore */ }
        if (pets.length === 0) {
            listContainer.innerHTML = '<p style="padding: 20px; text-align: center;">No hay mascotas registradas</p>';
            return;
        }

        pets.forEach((pet, index) => {
            try {
                if (!pet || !pet.id) {
                    console.warn('✗ Mascota sin ID en índice', index, ':', pet);
                    return;
                }

                const petRow = document.createElement('div');
                petRow.className = 'row';
                petRow.dataset.petId = String(pet.id);

                const name = pet.name || 'Sin nombre';
                const type = pet.kind || 'Desconocido';
                const breed = pet.breed || 'Desconocida';

                petRow.innerHTML = `
                    <img src="imgs/pet01.png" alt="${name}">
                    <div class="data">
                        <h3>${name}</h3>
                        <h4>${type}: ${breed}</h4>
                    </div>
                    <nav class="actions">
                        <a href="javascript:;" class="btnShow" title="Ver">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#333" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="#333" stroke-width="1.2" fill="none"/>
                            </svg>
                        </a>
                        <a href="javascript:;" class="btnEdit" title="Editar">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M3 21v-3.75L14.81 5.44a2 2 0 0 1 2.83 0l1.92 1.92a2 2 0 0 1 0 2.83L7.75 21H3z" stroke="#333" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 6l4 4" stroke="#333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <a href="javascript:;" class="btnDelete" title="Eliminar">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <polyline points="3 6 5 6 21 6" stroke="#b70000" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="#b70000" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 11v6" stroke="#b70000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11v6" stroke="#b70000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </nav>
                `;

                listContainer.appendChild(petRow);
                console.log(`✓ Mascota ${index + 1}:`, name);
            } catch (error) {
                console.error('✗ Error renderizando mascota en índice', index, ':', error);
            }
        });

        console.log('✓ Renderizado completado');
        setupPetActions();
    } catch (error) {
        console.error('✗ Error en renderPets:', error);
    }
}

// ==================== PET ACTIONS ====================
function setupPetActions() {
    const btnShow = document.querySelectorAll('.btnShow');
    const btnEdit = document.querySelectorAll('.btnEdit');
    const btnDelete = document.querySelectorAll('.btnDelete');

    console.log('► Attachando listeners:', btnShow.length, 'mascotas');

    btnShow.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                const row = e.target.closest('.row');
                if (!row || !row.dataset.petId) {
                    console.error('✗ Row o petId no encontrado');
                    return;
                }
                const petId = String(row.dataset.petId).trim();
                if (!petId) return;
                
                console.log('► Click Show - petId:', petId);
                currentPetId = petId;
                currentView = 'show';
                showView();
                loadPetDetail(petId);
            } catch (error) {
                console.error('✗ Error en btnShow:', error);
            }
        });
    });

    btnEdit.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                const row = e.target.closest('.row');
                if (!row || !row.dataset.petId) {
                    console.error('✗ Row o petId no encontrado');
                    return;
                }
                const petId = String(row.dataset.petId).trim();
                if (!petId) return;
                
                console.log('► Editar mascota:', petId);
                currentPetId = petId;
                currentView = 'edit';
                showView();
                populateEditForm(petId);
            } catch (error) {
                console.error('✗ Error en btnEdit:', error);
            }
        });
    });

    btnDelete.forEach(element => {
        element.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const row = e.target.closest('.row');
                if (!row || !row.dataset.petId) {
                    console.error('✗ Row o petId no encontrado');
                    return;
                }
                const petId = String(row.dataset.petId).trim();
                if (!petId) return;
                
                console.log('► Eliminar mascota:', petId);
                const result = await Swal.fire({
                    icon: 'warning',
                    title: '¿Eliminar mascota?',
                    text: 'Esta acción no se puede deshacer',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#d9534f',
                    cancelButtonColor: '#5cb85c'
                });
                if (result.isConfirmed) {
                    await deletePet(petId);
                }
            } catch (error) {
                console.error('✗ Error en btnDelete:', error);
            }
        });
    });
}

// ==================== NAVIGATION ====================
function setupNavigation() {
    const btnLogout = document.querySelector('.btnLogout');
    const btnAdd = document.querySelector('.btnAdd');
    const btnBackElements = document.querySelectorAll('.btnBack');

    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            await logout();
        });
    }

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            currentView = 'add';
            showView();
        });
    }

    btnBackElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e && e.preventDefault) e.preventDefault();
            currentView = 'dashboard';
            showView();
            loadPets();
        });
    });
}


// ==================== ADD FORM ====================
function setupAddForm() {
    const btnAddPet = document.querySelector('#add .btnAddPet');
    const btnCancel = document.querySelector('#add .btnCancel');
    const form = document.querySelector('#addForm');
    
    if (btnAddPet) {
        btnAddPet.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('► Agregando mascota...');
            
            const petData = {
                name: document.getElementById('addName').value,
                kind: document.getElementById('addKind').value,
                breed: document.getElementById('addBreed').value,
                location: document.getElementById('addLocation').value,
                description: document.getElementById('addDescription').value
            };

            // Convert numeric fields only if provided
            const weightRaw = document.getElementById('addWeight').value;
            if (weightRaw !== null && weightRaw !== undefined && String(weightRaw).trim() !== '') {
                const w = Number(weightRaw);
                if (!Number.isNaN(w)) petData.weight = w;
            }

            const ageRaw = document.getElementById('addAge').value;
            if (ageRaw !== null && ageRaw !== undefined && String(ageRaw).trim() !== '') {
                const a = parseInt(ageRaw, 10);
                if (!Number.isNaN(a)) petData.age = a;
            }

            // No validar en frontend - dejar que la API valide

            // Ensure string fields are strings
            petData.name = String(petData.name || '');
            petData.kind = String(petData.kind || '');
            if (petData.breed !== undefined) petData.breed = String(petData.breed);
            else petData.breed = '';
            if (petData.location !== undefined) petData.location = String(petData.location);
            else petData.location = '';
            if (petData.description !== undefined) petData.description = String(petData.description);
            else petData.description = '';

            try {
                console.log('✓ setupAddForm: Enviando datos:', petData);
                const response = await apiCall(`${API_BASE_URL}/pets/store`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(petData)
                });

                if (!response) {
                    console.error('✗ setupAddForm: Token inválido');
                    return;
                }
                
                const data = await response.json();

                if (response.ok) {
                    try { Swal.fire({ icon: 'success', title: '', text: getApiMessage(data, ''), showConfirmButton: false, timer: 1400 }); } catch(e) {}
                    form.reset();
                    currentView = 'dashboard';
                    showView();
                    await loadPets();
                } else {
                    const msg = getApiMessage(data, '');
                    Swal.fire({ 
                        icon: 'error', 
                        title: '',
                        text: msg || 'Error',
                        confirmButtonText: 'Entendido',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            } catch (error) {
                console.error('✗ Error:', error);
                Swal.fire({ 
                    icon: 'error', 
                    title: 'Error de conexión', 
                    text: error.message,
                    confirmButtonText: 'Entendido',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('► Cancelar agregar');
            form.reset();
            currentView = 'dashboard';
            showView();
        });
    }
}

// ==================== EDIT FORM ====================
function setupEditForm() {
    const btnUpdatePet = document.querySelector('#edit .btnUpdatePet');
    const btnCancel = document.querySelector('#edit .btnCancel');
    const form = document.querySelector('#editForm');
    
    if (btnUpdatePet) {
        btnUpdatePet.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('► Actualizando mascota...');
            
            const petData = {
                name: document.getElementById('editName').value,
                kind: document.getElementById('editKind').value,
                breed: document.getElementById('editBreed').value,
                location: document.getElementById('editLocation').value,
                description: document.getElementById('editDescription').value
            };

            // Convert numeric fields only if provided to avoid validation 422
            const weightRaw = document.getElementById('editWeight').value;
            if (weightRaw !== null && weightRaw !== undefined && String(weightRaw).trim() !== '') {
                const w = Number(weightRaw);
                if (!Number.isNaN(w)) petData.weight = w;
            }

            const ageRaw = document.getElementById('editAge').value;
            if (ageRaw !== null && ageRaw !== undefined && String(ageRaw).trim() !== '') {
                const a = parseInt(ageRaw, 10);
                if (!Number.isNaN(a)) petData.age = a;
            }

            // No validar en frontend - dejar que la API valide

            // Forzar que ciertos campos que la API espera como string lleguen como string
            petData.name = String(petData.name || '');
            petData.kind = String(petData.kind || '');
            if (petData.breed !== undefined) petData.breed = String(petData.breed);
            else petData.breed = '';
            if (petData.location !== undefined) petData.location = String(petData.location);
            else petData.location = '';
            if (petData.description !== undefined) petData.description = String(petData.description);
            else petData.description = '';

            try {
                console.log('✓ setupEditForm: Enviando datos:', petData);
                const response = await apiCall(`${API_BASE_URL}/pets/edit/${currentPetId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(petData)
                });

                if (!response) {
                    console.error('✗ setupEditForm: Token inválido');
                    return;
                }
                
                const data = await response.json();

                if (response.ok) {
                    try { Swal.fire({ icon: 'success', title: '', text: getApiMessage(data, ''), showConfirmButton: false, timer: 1400 }); } catch(e) {}
                    currentView = 'dashboard';
                    showView();
                    await loadPets();
                } else {
                    const msg = getApiMessage(data, '');
                    Swal.fire({ icon: 'error', title: '', text: msg || 'Error' });
                }
            } catch (error) {
                console.error('✗ Error:', error);
                Swal.fire({ icon: 'error', title: 'Error de conexión', text: error.message });
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('► Cancelar edición');
            form.reset();
            currentView = 'dashboard';
            showView();
        });
    }
}

// ==================== LOAD PET DETAIL ====================
async function loadPetDetail(petId) {
    try {
        console.log('✓ loadPetDetail: Cargando detalle de mascota:', petId);
        const response = await apiCall(`${API_BASE_URL}/pets/show/${petId}`, {
            method: 'GET'
        });

        if (!response) {
            console.error('✗ loadPetDetail: Token inválido');
            return;
        }

        const data = await response.json();

        if (response.ok) {
            // Extraer los datos de la mascota
            let pet = null;
            if (data.data) {
                pet = data.data;
            } else if (data.pet) {
                pet = data.pet;
            } else {
                pet = data;
            }
            
            console.log('► Pet a mostrar:', pet);
            displayPetDetail(pet);
        } else {
            console.error('✗ Error al cargar detalle:', response.status, data);
            // Fallback: buscar en la lista previa cargada en memoria
            if (window.allPets && Array.isArray(window.allPets)) {
                const found = window.allPets.find(p => String(p.id) === String(petId));
                if (found) {
                    console.log('► Usando fallback local para detalle de mascota:', found);
                    displayPetDetail(found);
                    return;
                }
            }
        }
    } catch (error) {
        console.error('Error loading pet detail:', error);
    }
}

// ==================== DISPLAY PET DETAIL ====================
function displayPetDetail(pet) {
    if (!pet) {
        console.warn('⚠ Pet vacío en displayPetDetail');
        return;
    }
    
    try {
        // Llenar los datos de la mascota en orden
        const valueEls = document.querySelectorAll('.pet-details .detail .value');
        const values = [
            pet.name || '-',
            pet.kind || '-',
            pet.weight || '-',
            pet.age || '-',
            pet.breed || '-',
            pet.location || '-',
            pet.description || '-'
        ];
        
        valueEls.forEach((el, idx) => {
            if (el && values[idx] !== undefined) {
                el.textContent = values[idx];
            }
        });
        
        // Actualizar imagen
        const imgEl = document.querySelector('.pet-image img');
        if (imgEl) {
            imgEl.src = 'imgs/huella.png';
        }
    } catch (error) {
        console.error('✗ Error en displayPetDetail:', error);
    }
}

// ==================== POPULATE EDIT FORM ====================
async function populateEditForm(petId) {
    try {
        console.log('✓ populateEditForm: Cargando datos para editar:', petId);
        let response = await apiCall(`${API_BASE_URL}/pets/edit/${petId}`, {
            method: 'GET'
        });

        if (!response) {
            console.error('✗ populateEditForm: Token inválido');
            return;
        }

        // If primary endpoint 404, try fallback /pets/{id}
        if (!response.ok && response.status === 404) {
            console.warn('✓ populateEditForm: Intentando endpoint alternativo');
            response = await apiCall(`${API_BASE_URL}/pets/${petId}`, {
                method: 'GET'
            });

            if (!response) {
                console.error('✗ populateEditForm: Fallback también falló');
                return;
            }
        }

        let data = {};
        try { data = await response.json(); } catch(e) { data = {}; }

        let pet = null;
        if (data) {
            pet = data.data || data.pet || data;
        }

        // Si no hay datos remotos, usa caché local
        if ((!response.ok || !pet || !pet.id) && window.allPets && Array.isArray(window.allPets)) {
            const found = window.allPets.find(p => String(p.id) === String(petId));
            if (found) {
                pet = found;
                console.log('✓ populateEditForm: Usando caché local');
            }
        }

        if (pet) {
            // Coerce values to safe primitives for inputs
            document.getElementById('editName').value = pet.name != null ? String(pet.name) : '';
            document.getElementById('editKind').value = pet.kind != null ? String(pet.kind) : '';
            document.getElementById('editWeight').value = pet.weight != null ? String(pet.weight) : '';
            document.getElementById('editAge').value = pet.age != null ? String(pet.age) : '';
            document.getElementById('editBreed').value = pet.breed != null ? String(pet.breed) : '';
            document.getElementById('editLocation').value = pet.location != null ? String(pet.location) : '';
            document.getElementById('editDescription').value = pet.description != null ? String(pet.description) : '';
        } else {
            console.warn('✗ populateEditForm: pet data not found for id', petId);
            try { Swal.fire({ icon: 'warning', title: 'No se pudo cargar la mascota', text: 'No se encontraron datos para editar. Asegúrate de que la API responda.' }); } catch(e){}
        }
    } catch (error) {
        console.error('Error filling edit form:', error);
        try { Swal.fire({ icon: 'error', title: 'Error', text: 'Error al cargar datos de la mascota' }); } catch(e){}
    }
}

// ==================== DELETE PET ====================
async function deletePet(petId) {
    try {
        console.log('✓ deletePet: Eliminando mascota:', petId);
        const response = await apiCall(`${API_BASE_URL}/pets/delete/${petId}`, {
            method: 'DELETE'
        });

        if (!response) {
            console.error('✗ deletePet: Token inválido');
            return;
        }

        const data = await response.json();
        if (response.ok) {
            try { Swal.fire({ icon: 'success', title: '', text: getApiMessage(data, ''), showConfirmButton: false, timer: 1200 }); } catch(e) {}
            currentView = 'dashboard';
            showView();
            await loadPets();
        } else {
            const msg = getApiMessage(data, '');
            Swal.fire({ icon: 'error', title: '', text: msg || 'Error' });
        }
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error de conexión', text: error.message });
    }
}

// ==================== LOGOUT ====================
async function logout() {
    console.log('✓ logout: Cerrando sesión');
    
    // Limpiar sesión localmente
    tokenMonitorizado = null;
    localStorage.removeItem('authToken');
    
    // Ir a login
    currentView = 'login';
    showView();
}

// ==================== SHOW VIEW ====================
function showView() {
    console.log('► Vista:', currentView);
    
    // Ocultar todas
    Object.values(views).forEach(view => {
        if (view) {
            view.style.display = 'none';
            view.classList.remove('animateView');
        }
    });
    
    // Mostrar actual
    if (views[currentView]) {
        views[currentView].style.display = 'block';
        views[currentView].classList.add('animateView');
    }
}
