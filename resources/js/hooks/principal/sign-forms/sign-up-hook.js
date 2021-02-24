import React, {useState, useEffect} from 'react';
import {useAuthDispatch, registerUser} from '../../../context';

const useSignUp = (validateForm) => {
    const dispatch = useAuthDispatch();
    const actualDate = new Date();
    let actualYear = actualDate.getFullYear();
    let actualMonth = actualDate.getMonth();
    let actualDay = actualDate.getDate();

    const [days, setDays] = useState([]);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([
        {m:0, n:'ene'},
        {m:1, n:'feb'},
        {m:2, n:'mar'},
        {m:3, n:'abr'},
        {m:4, n:'may'},
        {m:5, n:'jun'},
        {m:6, n:'jul'},
        {m:7, n:'ago'},
        {m:8, n:'sep'},
        {m:9, n:'oct'},
        {m:10, n:'nov'},
        {m:11, n:'dic'},
    ]);
    const [userData, setUserData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        usuario: '',
        contrasena: '',
        diaN: actualDay,
        mesN: actualMonth,
        yearN: actualYear,
    });

    useEffect(() => {
        let actualYear = actualDate.getFullYear();
        
        let allYears = [];
        for(let x = 0; x <= 70; x++) {
            allYears.push(actualYear - x)
        }
        setYears(allYears);

    }, []);

    useEffect(() => {

        let year = parseInt(userData.yearN);
        let month = parseInt(userData.mesN);
        let iteratedDays = [];

        //set days of the month
        var daysMonth = new Date(year, month+1,0).getDate();
        for(let i = 1; i<=daysMonth; i++){
            iteratedDays.push(i)
        }
        setDays(iteratedDays)
    

    }, [userData.yearN, userData.mesN]);

    //  select for years
    const selectYears = () => {
        return years.map((item) => {
            return(
                <option key = {item} value = {item} >
                    {item}
                </option>
            )
        })
    }

    const selectMonths = () => {
        return months.map((item, index) => {
            return(
                <option key = {index} value = {item.m}>
                    {item.n}
                </option>
            )
        })
    }

    const selectDays = () => {
        return days.map((item) => {
            return(
                <option key = {item} value ={item}>
                    {item}
                </option>
            )
        });
    }

    const onChangeInput = (e) => {
        const name = e.target.name;
        let value ;
        switch(name){
            case 'diaN':
                value = parseInt(e.target.value);
                break;
            case 'mesN':
                value = parseInt(e.target.value);
                break;
            case 'yearN':
                value = parseInt(e.target.value);
                break;
            default:
                value = e.target.value;
                break;
        }

        setUserData(userData => ({...userData, [name]:value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const validate = validateForm();
        if(validate){
            let fechaNacimiento = new Date(userData.yearN, userData.mesN, userData.diaN);
            let data = {
                nombres: userData.nombres,
                apellido: userData.apellidos,
                correo: userData.email,
                usuario: userData.usuario,
                contrasena: userData.contrasena,
                fechaNacimiento: fechaNacimiento
            };
            registerUser(dispatch, data)
        }
    }

    return{
        userData,
        onChangeInput,
        onSubmitForm,
        selectYears,
        selectMonths,
        selectDays
    }
}

export default useSignUp