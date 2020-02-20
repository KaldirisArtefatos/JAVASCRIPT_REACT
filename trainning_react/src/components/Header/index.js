import React from 'react';
import './styles.css';

// Forma 1 (Named function - quando precisarmos trabalhar com estado)
// class Header extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() { 
//         return (
//             <header id="main-header">Trainning React</header>
//         );
//     }
// }
 
// Forma 2
const Header = () => (
    <header id="main-header">Trainning React</header>
)

//Forma 3: 
// const Header = () =>{
//     return <header id="main-header">Trainning React</header>;
// }

export default Header;