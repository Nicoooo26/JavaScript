import { guardarDatos, BASEURL, obtenerDatos } from "./crudFetch.js";
const botonGuarda = document.getElementById('boton')
const botonObten = document.getElementById('boton2')
const nombre = document.getElementById('nombre')
const anadeTabla = document.getElementById('anadeTabla')
const email = document.getElementById('email')
const lista = document.getElementById('lista')
const tabla = [
/*
   { nombre:...,
     email:....,
 }
*/            
]   

anadeTabla.addEventListener("click",()=> {
    tabla.push({
               'nombre':nombre.value,
               'email' : email.value,
               })
    console.log(tabla)
    nombre.value=""
    email.value=""   
                                        })
botonGuarda.addEventListener("click",() => tabla.forEach(el => guardarDatos(BASEURL, 'conceptos', el)));
botonObten.addEventListener("click",async() => {
    lista.textContent=""
    const resultado = await obtenerDatos(BASEURL,'conceptos','nombre', nombre.value);
    resultado.map(x=>{
        let elementoLista=document.createElement('div')
        elementoLista.innerHTML=`${x.nombre} and  ${x.email}`
        lista.append(elementoLista)
    })
    console.clear()
    console.log(resultado);
});