import React,{useCallback} from 'react';
import Wraper from './HOC/Wraper';
import { useDispatch } from 'react-redux';

  

  
  

function Input (props) {
     
    const Clickfuntion=()=>
  {
   
        props.onclickfunction();
   
  }
    return(<input style={props.styles} id="reenter" onClick={Clickfuntion} value={props.value} type="submit" />)
}

export default (Wraper(Input)); 