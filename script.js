const products = [
 {id:1,name:"Luces LED H7",category:"Iluminación",price:24.99,badge:"Nuevo",rating:"4.8",reviews:120,image:"https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=700&q=80",desc:"Mejor visibilidad para tus recorridos."},
 
 {id:3,name:"Pantalla multimedia",category:"Audio",price:89.99,badge:"Nuevo",rating:"4.9",reviews:75,image:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=700&q=80",desc:"Tecnología para acompañar cada viaje."},
 {id:4,name:"Rin deportivo",category:"Rines",price:159.99,badge:"-20%",rating:"4.7",reviews:60,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",desc:"Diseño moderno para tu vehículo."},
 {id:5,name:"Compresor de aire",category:"Herramientas",price:34.99,badge:"Popular",rating:"4.5",reviews:84,image:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80",desc:"Práctico para revisar la presión."},
 {id:6,name:"Cámara para tablero",category:"Audio",price:49.99,badge:"Nuevo",rating:"4.8",reviews:51,image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",desc:"Registra tus recorridos en carretera."},
 {id:7,name:"Organizador de maletero",category:"Interior",price:18.50,badge:"Oferta",rating:"4.4",reviews:44,image:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",desc:"Mantén tus objetos ordenados."},
 {id:8,name:"Kit de herramientas",category:"Herramientas",price:29.99,badge:"Popular",rating:"4.7",reviews:110,image:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80",desc:"Accesorios básicos para emergencias."},
 
 {id:10,name:"Cargador USB para auto",category:"Audio",price:12.99,badge:"Oferta",rating:"4.6",reviews:89,image:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=700&q=80",desc:"Carga tus dispositivos mientras conduces."},
 
 {id:12,name:"Cubrevolante",category:"Interior",price:11.99,badge:"Nuevo",rating:"4.4",reviews:46,image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",desc:"Mejor agarre y un toque personal."}
];
const googleTools = [
 ["Google Drive","Almacena y comparte archivos en la nube.","https://drive.google.com/","#0F9D58","bi-cloud-arrow-up"],
 ["Google Docs","Crea documentos y trabaja en equipo.","https://docs.google.com/"," #4285F4","bi-file-earmark-text"],
 ["Google Sheets","Organiza inventarios, gastos y ventas.","https://sheets.google.com/","#0F9D58","bi-file-earmark-spreadsheet"],
 ["Google Slides","Prepara presentaciones de productos.","https://slides.google.com/","#F4B400","bi-easel"],
 ["Gmail","Envía y recibe correos de clientes.","https://mail.google.com/","#EA4335","bi-envelope"],
 ["Google Calendar","Programa citas, entregas y promociones.","https://calendar.google.com/","#4285F4","bi-calendar3"],
 ["Google Maps","Consulta rutas y ubicaciones.","https://maps.google.com/","#34A853","bi-geo-alt"],
 ["Google Forms","Crea encuestas y formularios de pedidos.","https://forms.google.com/","#7248B9","bi-ui-checks"],
 ["Google Meet","Realiza reuniones por videollamada.","https://meet.google.com/","#34A853","bi-camera-video"],
 ["Google Chat","Mantén conversaciones de trabajo.","https://chat.google.com/","#34A853","bi-chat-dots"],
 ["Google Keep","Guarda ideas y listas rápidas.","https://keep.google.com/","#F4B400","bi-lightbulb"],
 ["Google Sites","Crea páginas web sencillas.","https://sites.google.com/","#4285F4","bi-window"],
 ["Google Photos","Organiza fotografías de productos.","https://photos.google.com/","#EA4335","bi-images"],
 ["YouTube","Publica videos y demostraciones.","https://youtube.com/","#FF0033","bi-youtube"],
 ["Google Analytics","Consulta estadísticas de visitas web.","https://analytics.google.com/","#F4B400","bi-graph-up"]
];
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
let cart=[];
let language="es";
function showToast(message){const t=$("#toastMessage");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2600)}
function renderProducts(){
 const category=$("#filtroCategoria").value;
 const search=($("#buscarProducto").value||$("#busqueda").value||"").trim().toLowerCase();
 let list=products.filter(p=>(category==="Todas"||p.category===category)&&(`${p.name} ${p.category} ${p.desc}`).toLowerCase().includes(search));
 const order=$("#ordenPrecio").value;
 if(order==="asc")list.sort((a,b)=>a.price-b.price);
 if(order==="desc")list.sort((a,b)=>b.price-a.price);
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card reveal visible"><div class="product-photo"><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-badge">${p.badge}</span></div><div class="product-details"><h3>${p.name}</h3><p class="product-desc">${p.desc}</p><div class="product-bottom"><span class="price">$${p.price.toFixed(2)}</span><span class="rating"><i class="bi bi-star-fill"></i> ${p.rating} <small>(${p.reviews})</small></span></div><button class="add-cart" data-add="${p.id}"><i class="bi bi-bag-plus"></i> ${language==="es"?"Agregar al carrito":"Add to cart"}</button></div></article>`).join("");
 $("#resultCount").textContent=language==="es"?`Mostrando ${list.length} de ${products.length} productos`:`Showing ${list.length} of ${products.length} products`;
 $("#sinResultados").hidden=list.length>0;
}
function renderGoogle(){ $("#googleGrid").innerHTML=googleTools.map(t=>`<article class="google-tool"><span class="tool-icon" style="color:${t[3].trim()}"><i class="bi ${t[4]}"></i></span><div><h3>${t[0]}</h3><p>${t[1]}</p><a href="${t[2]}" target="_blank" rel="noopener">${language==="es"?"Abrir herramienta":"Open tool"} <i class="bi bi-arrow-up-right"></i></a></div></article>`).join("");}
function renderCart(){
 $("#cartCount").textContent=cart.reduce((sum,item)=>sum+item.qty,0);
 $("#cartItems").innerHTML=cart.length?cart.map(item=>`<div class="cart-item"><div><b>${item.name}</b><br><span>$${item.price.toFixed(2)} × ${item.qty}</span></div><button data-remove="${item.id}" aria-label="Quitar ${item.name}"><i class="bi bi-trash"></i></button></div>`).join(""):`<p class="muted">${language==="es"?"Todavía no has agregado productos.":"You haven't added any products yet."}</p>`;
 $("#cartTotal").textContent="$"+cart.reduce((sum,item)=>sum+item.price*item.qty,0).toFixed(2);
}
function setLanguage(){
 document.documentElement.lang=language;
 $$("[data-es][data-en]").forEach(el=>el.textContent=el.dataset[language]);
 $("#btnIdioma").textContent=language==="es"?"English":"Español";
 $("#buscarProducto").placeholder=language==="es"?"Buscar accesorio...":"Search accessories...";
 $("#busqueda").placeholder=language==="es"?"Busca productos, categorías...":"Search products, categories...";
 $("#nombre").placeholder=language==="es"?"Tu nombre":"Your name";
 $("#mensaje").placeholder=language==="es"?"Escribe tu consulta aquí...":"Write your question here...";
 $("#newsletterEmail").placeholder=language==="es"?"Tu correo electrónico":"Your email address";
 renderProducts();renderGoogle();renderCart();
}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");
 if(add){const p=products.find(x=>x.id===Number(add.dataset.add));const existing=cart.find(x=>x.id===p.id);existing?existing.qty++:cart.push({...p,qty:1});renderCart();showToast(language==="es"?"Producto agregado al carrito":"Product added to cart");}
 const remove=e.target.closest("[data-remove]");
 if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));renderCart();}
 const cat=e.target.closest("[data-category]");
 if(cat){e.preventDefault();$("#filtroCategoria").value=cat.dataset.category;renderProducts();$("#productos").scrollIntoView({behavior:"smooth"});}
});
$("#filtroCategoria").addEventListener("change",renderProducts);
$("#ordenPrecio").addEventListener("change",renderProducts);
$("#buscarProducto").addEventListener("input",()=>{$("#busqueda").value=$("#buscarProducto").value;renderProducts()});
$("#busqueda").addEventListener("input",()=>{$("#buscarProducto").value=$("#busqueda").value;renderProducts()});
$("#btnIdioma").addEventListener("click",()=>{language=language==="es"?"en":"es";setLanguage()});
$("#btnTema").addEventListener("click",()=>{document.body.classList.toggle("light-mode");localStorage.setItem("autozone-theme",document.body.classList.contains("light-mode")?"light":"dark")});
if(localStorage.getItem("autozone-theme")==="light")document.body.classList.add("light-mode");
$("#btnBuscar").addEventListener("click",()=>{$("#searchStrip").classList.toggle("open");if($("#searchStrip").classList.contains("open"))$("#busqueda").focus()});
$("#cerrarBuscar").addEventListener("click",()=>$("#searchStrip").classList.remove("open"));
function toggleCart(open){$("#cartDrawer").classList.toggle("open",open);$("#drawerBackdrop").classList.toggle("show",open);$("#cartDrawer").setAttribute("aria-hidden",String(!open));}
$("#btnCarrito").addEventListener("click",()=>toggleCart(true));
$("#cerrarCarrito").addEventListener("click",()=>toggleCart(false));
$("#drawerBackdrop").addEventListener("click",()=>toggleCart(false));
$("#checkoutBtn").addEventListener("click",()=>{if(!cart.length){showToast(language==="es"?"Agrega un producto primero":"Add a product first");return;}const msg=cart.map(i=>`${i.name} x${i.qty} - $${(i.price*i.qty).toFixed(2)}`).join("\n");const total=cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);const subject=encodeURIComponent("Consulta de compra - AUTOZONE");const body=encodeURIComponent(`Hola AUTOZONE, quisiera consultar por estos productos:\n${msg}\nTotal estimado: $${total}`);location.href=`mailto:contacto@autozone.example?subject=${subject}&body=${body}`;});
$("#contactForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#nombre").value.trim(),email=$("#correo").value.trim(),topic=$("#tema").value,message=$("#mensaje").value.trim();const subject=encodeURIComponent(`Consulta AUTOZONE: ${topic}`);const body=encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\nTema: ${topic}\nMensaje: ${message}`);$("#formNotice").textContent=language==="es"?"Se abrirá tu aplicación de correo para enviar el mensaje.":"Your email app will open to send the message.";location.href=`mailto:contacto@autozone.example?subject=${subject}&body=${body}`;});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast(language==="es"?"¡Gracias! Suscripción de demostración registrada.":"Thanks! Demo subscription registered.");e.target.reset()});
$("#year").textContent=new Date().getFullYear();
$("#backTop").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
window.addEventListener("scroll",()=>$("#backTop").classList.toggle("show",window.scrollY>450));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.08});
$$(".reveal").forEach(el=>observer.observe(el));
renderProducts();renderGoogle();renderCart();
