

import { Footer } from "../components/Footer";
import { CountryDetailTop } from "../components/CountryDetailTop";
import { CountryDetailsBottom } from "../components/CountryDetailsBottom";
import { useParams } from 'react-router-dom';
import React,{ useEffect } from "react"
import api from '../api/index'
const CountryDetails = () => {
    const params = useParams()
    const [data, setData] = React.useState([]);
    useEffect(() => {
        getData()
      }, []);
  
      const getData = () =>{
        api.get("../../json/"+params.id+".json").then((res)=> {
            setData(res.data);
            console.log(data)
        })
        .catch(err => console.log(err))
      }
    return (
        <div>
            <CountryDetailTop content={data['about']}/>
            <CountryDetailsBottom content={data}/>
            <Footer />
        </div>
    )
}

export default CountryDetails;