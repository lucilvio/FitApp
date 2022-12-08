export function tratarErro(error) {
    if (!error.erro) {
        console.error(error);
    }
    else {
        const elementoToast = document.querySelector("#toast");
        const toast = new bootstrap.Toast(elementoToast);

        document.querySelector("#toast-body").innerHTML = error.erro;
        toast.show();

        console.error(error.erro);
    }
} 