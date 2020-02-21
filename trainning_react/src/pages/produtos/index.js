import React, { Component } from 'react';
import api from '../../services/api';
 
class Produto extends Component {
 
    state = {
        id: '0',
        nome: '',
        categoria: '',
        valor: 0
    }
 
    componentDidMount(){
        this.loadProduto();
    }
 
 
    handleId = (event) => {
        this.setState({id: event.target.value});
    }
 
    handleNome = (event) => {
        this.setState({nome: event.target.value});
    }
    handleCategoria = (event) => {
        this.setState({categoria: event.target.value});
    }
    handleValor = (event) => {
        this.setState({valor: event.target.value});
    }
 
 
    loadProduto = async () => {
        // Pulo do gato 2.0 (Obtendo a querystring da rota) 
        const {id} = this.props.match.params;
 
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        } 
 
        const produto = await api.get(`produtos/${id}`, {
            headers: headers
        }).then(resp =>{
            this.setState({
                id: resp.data.id,
                nome: resp.data.nome,
                categoria: resp.data.categoria,
                valor: resp.data.valor
            });            
        });
    }
 
    salvarProduto = async (event) => {        
        event.preventDefault();
        
        let produtoForm = {
            nome: this.state.nome,
            categoria: this.state.categoria,
            valor: this.state.valor
        }               
        
        if(this.state.id != '0'){
            await this.alterar(this.state.id, produtoForm);   
        } else {
            await this.criar(produtoForm); 
        }
    }
    
    criar = async (produto) => {        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
 
        const produtos = await api.post('/produtos',  produto, {headers: headers})
        .then(resp => {
            console.log('produto cadastrado com sucesso');
        });
        
    }
 
    alterar = async (id, produto) =>{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
 
        const produtos = await api.put('/produtos/' + id, produto, {headers: headers})
        .then(resp => {
            console.log('produto alterado com sucesso');
        });
        
    }
 
 
    render() { 
        return ( 
            <form onSubmit={this.salvarProduto} >
                <input type="hidden" id="id" value={this.state.id} onChange={this.handleId}  />
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" id="nome" placeholder="Informe o nome" value={this.state.nome} onChange={this.handleNome}  />
                </div>                
                <div class="form-group">
                    <label for="categoria">Categoria</label>
                    <select class="form-control" id="categoria" onChange={this.handleCategoria} >
                        <option value="Categoria 1">Categoria 1</option>
                        <option value="Categoria 2">Categoria 2</option>                    
                    </select>
                </div>                
                
                <div class="form-group">
                    <label for="valor">Valor</label>
                    <input type="text" class="form-control" id="valor" placeholder="Informe o valor" value={this.state.valor} onChange={this.handleValor}  />
                </div>                
                <input type="submit" value="Salvar" />
            </form>
         );
    }
}
 
export default Produto;

