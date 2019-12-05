import React,{Component} from 'react';


//components
import Header from  './Components/CompHeader/Header';
import Footer from  './Components/CompFooter/Footer';
import HomePage from  './Components/CompPages/HomePage';
import ReaderQR1 from  './Components/CompPages/ReaderQR1';
import Modal from  './Components/CompPages/Modal';
import InorderSpecs2 from  './Components/CompPages/ResponsiveTable';
import InorderSpecs1 from  './Components/CompPages/EnhancedTable';
import TableTabs from  './Components/CompPages/Tabs';





//css
import './css/default.css';

class App extends Component{
  render(){
    return(
    <div>
      <Header />
      <TableTabs/>
      <Footer />
    </div>
    );
  }
}


export default App;
