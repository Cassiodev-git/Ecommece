import Categoria from "./Categoria.js";
import Produto from "./Produto.js";
import Carrinho from "./Carrinho.js"
import Usuario from "./Usuario.js"

Produto.belongsTo(Categoria, {
    foreignKey: 'categoriaId'
})
Categoria.hasMany(Produto, {
    foreignKey: 'categoriaId'
})
Carrinho.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
})
Usuario.hasMany(Carrinho, {
    foreignKey: 'usuarioId'
})
Produto.hasMany(Carrinho, {
    foreignKey: 'produtoId'
})
Carrinho.belongsTo(Produto, {
    foreignKey: 'produtoId',
    as: 'produto'
})