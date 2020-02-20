import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
 
class Main extends Component {
    
 
    // PULO DO GATO do React
    state = {
        produtos: []
    }
 
    componentDidMount(){
        // Iniciando por aqui
        this.loadProdutos();
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
            console.log('Produto excluido com sucesso');
 
            // TODO: Splice no array
            // this.setState({produtos: this.state.produtos})
            window.location.reload();
        });
 
        
    }  

 
 

 
    render() { 
        return ( 
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

                                <button 
                                        onClick={e => 
                                            window.confirm("Apagar Mesmo ?") &&
                                            this.excluir(produto.id)
                                        } 
                                        class="btn btn-danger btn-sm" >Excluir</button>


                            </td>
                        </tr>              
                    ))}
                </tbody>
            </table>
         );
    }
}
 
export default Main;
 
 
