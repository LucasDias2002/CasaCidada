async function CheckAutorizacao(){
    const token = BuscarCookie("userToken");

    if(!token){
        window.location.href = '/login';
        return;
    }
    try{
        const response = await fetch("/protected", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            } 
        });

        if(response.ok){
            console.log("Usuário logado!");
        }
        else{
            location.href = '/login';
        }
    }catch(erro){
        console.error('Erro ao verificar autenticação', erro);
        location.href = '/login';
    }
}

function BuscarCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

CheckAutorizacao();