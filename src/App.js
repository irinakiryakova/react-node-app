import React,{Component} from 'react';
//components
import Header from  './Components/CompHeader/Header';
import Footer from  './Components/CompFooter/Footer';
import Main from  './Components/CompPages/Main';


//css
import './css/default.css';

class App extends Component{
  render(){
    return(
    <div>
      <Header />
      <Main/>
      <Footer />
    </div>
    );
  }
}


export default App;
