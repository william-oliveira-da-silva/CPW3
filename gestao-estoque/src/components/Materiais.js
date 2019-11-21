import React, {
    Component
} from 'react';
import {
    database
} from '../utils/firebaseUtils';

class Materiais extends Component {

    constructor() {
        super();

        this.state = {
            material: {
                descricao: '',
                marca: '',
                categoria: 'Eletrônicos'
            },
            erro: false,
            sucesso: false,
            categorias: [],
            materiais: []
        };

        /*
         * Dá acesso a tudo o que foi definido
         * dentro do construtor para os métodos
         * abaixo.
         */
        this.aoAlterarValor =
            this.aoAlterarValor.bind(this);
        this.salvar = this.salvar.bind(this);
        this.recuperarMateriais =
            this.recuperarMateriais.bind(this);
    }

    /*
        Intercepta o momento em que
        o componente foi montado na tela
    */
    componentDidMount() {
        // Retorna todas as categorias do banco
        database
            .ref('categorias')
            .once('value')
            .then(
                snapshot => {
                    const valor = snapshot.val();
                    if (valor) {
                        const chaves = Object.keys(valor);
                        let categorias = [];
                        chaves.map(chave => categorias.push({ id: chave, valor: valor[chave].nome }));
                        this.setState({ categorias });
                    }
                },
                erro => console.log(erro)
            );

        this.recuperarMateriais();
    }

    recuperarMateriais() {
        // Retorna todos os materiais do banco
        database
            .ref('materiais')
            .once('value')
            .then(
                snapshot => {
                    const valor = snapshot.val();
                    if (valor) {
                        const chaves = Object.keys(valor);
                        let materiais = [];
                        chaves.map(chave => materiais.push({ id: chave, valor: valor[chave] }));
                        this.setState({ materiais });
                    }
                },
                erro => console.log(erro)
            );
    }

    salvar(evento) {
        evento.preventDefault();

        let material = this.state.material;

        database
            .ref('materiais')
            .push(material)
            .then(
                () => {
                    this.recuperarMateriais();

                    let material = {
                        descricao: '',
                        marca: '',
                        categoria: 'Eletrônicos'
                    };
                    this.setState({
                        material,
                        erro: false,
                        sucesso: true
                    });
                },
                erro => {
                    console.log(erro);
                    this.setState({
                        erro: true,
                        sucesso: false
                    });
                }
            )
            .catch(erro => {
                console.log(erro);
                this.setState({
                    erro: true,
                    sucesso: false
                });
            });
    }

    aoAlterarValor(evento) {
        const valor = evento.target.value;
        const nome = evento.target.name;

        // Pega a propriedade "material" do state do componente
        let material = {
            ...this.state.material
        };
        /*
         * Altera a subpropriedade de "material" cujo nome
         * corresponde ao nome do campo que está sendo alterado
         */
        material[nome] = valor;

        this.setState({
            material
        });
    }

    render() {

        const itensCategoria = this.state.categorias.map(
            categoria => {
                return (
                    <option key={categoria.id} value={categoria.valor}>
                        {categoria.valor}
                    </option>
                );
            }
        );

        const listaMateriais = this.state.materiais.map(
            material => {
                return (
                    <tr key={material.id}>
                        <td>{material.valor.descricao}</td>
                        <td>{material.valor.marca}</td>
                        <td>{material.valor.categoria}</td>
                    </tr>
                );
            }
        );

        return (
            <div>
                <h3>Novo material</h3>

                <br />

                {
                    /*
                        Se o sucesso for true, 
                        renderiza a div
                    */
                    this.state.sucesso &&
                    <div className="row">
                        <div className="col">
                            <span className="alert alert-success">
                                Material salvo
                                </span>
                        </div>
                    </div>
                }

                {
                    /*
                        Se erro for true,
                        renderiza a div
                    */
                    this.state.erro &&
                    <div className="row">
                        <div className="col">
                            <span className="alert alert-danger">
                                Ocorreu um problema ao tentar salvar o material
                            </span>
                        </div>
                    </div>
                }

                <br />

                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.salvar}>
                            <div className="form-group">
                                <label>Descrição</label>
                                <input
                                    placeholder="Digite a descrição"
                                    onChange={this.aoAlterarValor}
                                    value={this.state.material.descricao}
                                    name="descricao"
                                    className="form-control"
                                    required
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label>Marca</label>
                                <input
                                    placeholder="Digite a marca"
                                    onChange={this.aoAlterarValor}
                                    value={this.state.material.marca}
                                    name="marca"
                                    className="form-control"
                                    required
                                    type="text" />
                            </div>
                            <div className="form-group">
                                <label>Categoria</label>
                                <select
                                    onChange={this.aoAlterarValor}
                                    value={this.state.material.categoria}
                                    name="categoria"
                                    required
                                    className="form-control">
                                    {itensCategoria}
                                </select>
                            </div>

                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Salvar" />
                        </form>
                    </div>
                </div>


                <br />

                {
                    (this.state.materiais.length === 0) &&
                    <span>Nenhum material cadastrado</span>
                }

                {
                    (this.state.materiais.length > 0) &&
                    <div className="row">
                        <div className="col">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Marca</th>
                                        <th>Categoria</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaMateriais}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default Materiais;