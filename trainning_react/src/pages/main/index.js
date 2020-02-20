import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
 
class Main extends Component {
    
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
 
        // console.log(response);
 
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        } 
 
        const produtos = await api.get('produtos', {
            headers: headers
        });
 
        console.log('produtos (SUCESSO)', produtos);
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
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>              
            </tbody>
          </table>
 




         );
    }
}
 
export default Main;
 
