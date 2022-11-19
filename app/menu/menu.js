export async function carregarMenu() {
    //pega o elemento body
    const body = document.querySelector("body");
    
    //traz o conteudo do html do cabeçalho e converte a resposta para texto
    const menu = await fetch("/app/menu/menu.html");
    const conteudoDoMenu = await menu.text();
    
    //cria o elemento header e adiciona o conteudo do cabeçalho
    const aside = document.createElement("aside");
    aside.innerHTML = conteudoDoMenu;

    //adiciona o header no body
    body.prepend(aside);
}