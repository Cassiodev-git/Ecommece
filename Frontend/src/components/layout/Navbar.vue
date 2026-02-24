<template>
    <nav class="navbar">
        <h2><router-link to="/home" class="titulo">Compra<span class="sub-titulo">Fácil</span></router-link></h2>

        <ul>
            <li><router-link to="/perfil" class="nav-link">
                    <img src="/src/assets/usuario.png" alt="Usuario" class="icones" />
                </router-link></li>
            <li><router-link to="/carrinho" class="nav-link">
                    <img src="/src/assets/carrinho.png" alt="Carrinho" class="icones" />
                </router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

ul {
    list-style: none;
    display: flex;
    gap: 50px;
    margin: 0;
    padding: 0;
}

li {
    cursor: pointer;
}

.icones {
    width: 20px;
    height: 20px;
}

.titulo {
    color: #22C55E;
    text-decoration: none;
}

.sub-titulo {
    color: #FFFFFF;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
}

@media (max-width: 600px) {
    .titulo {
        display: none;
    }

    .navbar {
        display: flex;
        justify-content: center;
        padding: 12px;
    }

    ul {
        
        gap: 30px;
    }
}
</style>
