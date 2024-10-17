import axios from 'axios';


//Cidade retornada quando usuario não permite acesso à localização

const setCidadeCarregamento = (response,setCidade,setLoading)=> {
    if(response.data.address["ISO3166-2-lvl4"].slice(-2)=='DF'){
        let res = "Brasília"+" - "+response.data.address["ISO3166-2-lvl4"].slice(-2)
        setCidade(res);
        setLoading(true)
    }else{
        let res = response.data.address.city+" - "+response.data.address["ISO3166-2-lvl4"].slice(-2)
        setCidade(res);
        setLoading(true)
    }
}

const getCity = (cidade,setCidade,setLoading) => {
    const nav = typeof window !== 'undefined' ? navigator.geolocation : false
    const setCityDefault = ()=> {
        setCidade("São Paulo - SP");
        setLoading(true)
    }
    const getUserCity = async (position)=> {
        await axios.get('https://nominatim.openstreetmap.org/reverse?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&zoom=10&format=json')
        .then(response =>setCidadeCarregamento(response,setCidade,setLoading));
    }
        if (nav && cidade.length ==0) nav.getCurrentPosition(getUserCity,setCityDefault)
}

export {getCity}