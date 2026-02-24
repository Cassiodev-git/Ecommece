<template>
    <div class="navbar-aux">
        <ul>
            <li><router-link to="/home">Home</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "NavbarAuxiliar"
}
</script>

<style scoped>
.navbar-aux {
    background: #F9FAFB;
    border-top: 1px solid #E5E7EB;
    border-bottom: 1px solid #E5E7EB;
    padding: 10px 0;
    overflow-x: auto;
}

ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 0;
    padding: 0 20px;
    white-space: nowrap;
}

a {
    text-decoration: none;
    color: #374151;
    font-weight: 500;
}

a:hover {
    color: #22C55E;
}
</style>
