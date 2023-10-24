//Obtenemos la referencia a los elementos del DOM

const formulario = document.getElementById('formulario');

const seleccionados = document.getElementById("seleccionados")

const delegado = document.getElementById("delegado")
const subdelegado = document.getElementById("subDelegado")
const numVotos = document.getElementById("numVotos")
const botonG = document.getElementById("botonG")
const botonB = document.getElementById("botonB")


window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("votados") != null) {
        const votadosAlmacen = localStorage.getItem("votados").split(";").map(el => JSON.parse(el))
        votadosAlmacen.map((el) => {
            control.insertaVotado(el.nombre,el.votos)
        })

        control.votosEmitidos = votadosAlmacen.reduce((total, el) => total + el.votos, 0)
        numVotos.textContent = control.votosEmitidos

       

        control.dameDelegado()
    }
});



//Este objeto controlará todo

const control = {
    listaVotados:[],
    votosEmitidos:0,

    aumentaVoto(id){
        this.listaVotados[id].votos++
        this.votosEmitidos++
        numVotos.textContent = this.votosEmitidos
    },
    insertaVotado(nombre,votos=0)  {
        this.listaVotados.push({
            nombre:nombre,
            votos:votos,
        })
        const id = this.listaVotados.length-1;
        
        const elementoListaSeleccionados = document.createElement('div');
        elementoListaSeleccionados
            .innerHTML=`    <p>${nombre}</p>
                            <input type="button" class="boton-modificado" value="${votos}" id="C${id}" data-counter>`                     

        //añadimos el elemento a la lista de elementosdom       
        elementoListaSeleccionados.id=nombre


       seleccionados.append(elementoListaSeleccionados)

        //Asignamos los eventos a los botones
        document.getElementById(`C${id}`).addEventListener("click",(event)=>{  
            if (event.target.dataset.counter != undefined ) {
                this.aumentaVoto(id)
                event.target.value++
                this.dameDelegado()
                formulario["nombre"].focus()
            }
        })
    },  
    reseteaFormulario() {
        formulario['nombre'].value=''
        formulario['nombre'].focus()
    },
    dameDelegado(){
        const nombreDelegado =[...this.listaVotados].sort((ele1, ele2)=>
                    ele2.votos - ele1.votos)
        delegado.textContent=`Delegado: ${nombreDelegado[0].nombre}`
        const divDelegado= document.getElementById(`${nombreDelegado[0].nombre}`)
        seleccionados.insertAdjacentElement('afterbegin', divDelegado)
        if (nombreDelegado.length>1){
            subdelegado.textContent=`SubDelegado: ${nombreDelegado[1].nombre}`
            const divSubDelegado= document.getElementById(`${nombreDelegado[1].nombre}`)
            divDelegado.insertAdjacentElement('afterend', divSubDelegado)

        }
       
    },

}
//El submit
formulario.addEventListener("submit", (event)=> {
    event.preventDefault();
    if ( formulario['nombre'].value !== "") {
        control.insertaVotado(formulario['nombre'].value)          
        control.reseteaFormulario()      
    }

});

botonG.addEventListener("click",()=>{
    
   
    let listaLocal=control.listaVotados.map(el=>JSON.stringify(el)).join(";")
    localStorage.setItem("votados",listaLocal)
   
})
botonB.addEventListener("click",()=>{
    localStorage.clear()
   control.listaVotados=[]
   control.votosEmitidos=0
   numVotos.textContent=0
   delegado.textContent=""
   subdelegado.textContent=""
   seleccionados.innerHTML=""
})


