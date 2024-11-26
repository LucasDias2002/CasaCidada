document.getElementById("login").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha =  document.getElementById("senha").value;

    try{
        const response = await fetch("/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error("Falha no login. Verifique suas credenciais.");
        }

        const data = await response.json();

        if (data.data.token) {

            document.cookie = `userToken=${data.data.token}; path=/; max-age=3600`
            window.location.href = "/";
            
        } else {
            alert("Token não retornado!");
        }
    }catch(error){
        console.error("Erro no login:", error);
        alert("Erro ao tentar fazer login. Tente novamente.");
    }
})