function contAte(numerocontar) {
    for(let numeroAtual = 1; numeroAtual <= numerocontar; numeroAtual++) {
        console.log(numeroAtual)
    }
}


function contAteRecursiva(numerocontar, numeroAtual = 10) {
    if(numeroAtual < numerocontar) {
        return;
    }

    console.log(numeroAtual);
    contAteRecursiva(numerocontar, numeroAtual - 1);
}

contAteRecursiva(0);