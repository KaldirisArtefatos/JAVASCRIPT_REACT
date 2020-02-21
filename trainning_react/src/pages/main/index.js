
import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import _ from 'lodash';
 
 
class Main extends Component {
    
    // PULO DO GATO do React
    // Manipula a mensagem...
    state = {
        produtos: [],
        showMessage: false,
        message: ''
    }
 
    componentDidMount(){
        // Iniciando por aqui
        this.loadProdutos();     
    }
 
    closeMessage = () => {
        this.setState({showMessage: false, message: '', cssClass: ''});
    }
 
    loadProdutos = async () => {
 
        let params = {
            email: 'admin@admin.com',
            password: 'secret'
        }
 
        const response = await api.post('auth', params);
 
        sessionStorage.setItem('token', response.data.access_token);     
 
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        } 
 
        const produtos = await api.get('produtos', {
            headers: headers
        });
 
        console.log('produtos (SUCESSO)', produtos);
 
        this.setState({ produtos: produtos.data});
    }
 
    // Forma 1
    //excluir = async (event) => {
    
    // Forma 2
    excluir = async (idProduto) => {
        //console.log(event.target.getAttribute('data-id'));
        //const idProduto = event.target.getAttribute('data-id');
 
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        } 
 
        const response = await api.delete('produtos/' + idProduto, {
            headers: headers            
        }).then(resp =>{            
            this.setState({showMessage: true, message: 'Produto excluido com sucesso', cssClass: 'success'});
            this.setState({produtos: _.filter(this.state.produtos, function(p){ return p.id != idProduto})});
        });        
    }     
 
    render() { 
        return ( 
            <div>
                { this.state.showMessage ? 
                    <div class="alert alert-success" role="alert">
                            {this.state.message}
                            <span onClick={this.closeMessage} class="fechar">X</span>
                    </div> : ''
                }
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Ações</th>
                    </tr>
                    </thead>
                    <tbody>                
                        {this.state.produtos.map(produto =>(
                            <tr key={produto.id}>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.categoria}</td>
                                <td>{produto.valor}</td>
                                <td>
                                    {/* <button data-id={produto.id} onClick={e => this.excluir(e)} class="btn btn-danger btn-sm" >Excluir</button> */}
                                    <button onClick={e => 
                                                window.confirm("Você realmente deseja excluir o produto?") &&
                                                this.excluir(produto.id)
                                            } 
                                            class="btn btn-danger btn-sm" 
                                    >Excluir</button>
                                </td>
                            </tr>              
                        ))}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default Main;
 