export const BASEURL = "http://localhost:3000"


export const guardarDatos = async (url, tabla, dato) => {
    try {
        await fetch(`${url}/${tabla}`, {
            method: "POST", 
            body: JSON.stringify(dato), 
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (e) {
        console.log(e);
    }
}

export const obtenerDatos = async (url, tabla, campo, valor) => {
    try {
        const response = await fetch(`${url}/${tabla}?${campo}=${valor}`)
        return await response.json();
    } catch (error) {
        console.log(error)
    }

}
