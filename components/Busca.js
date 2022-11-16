//rafce
//useState = hook
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from '@rneui/themed';

const Busca = ({weatherData}) => {
    //contante cidade, onde será setado uma cidade com o useState em forma de String
    const [city, setCity] = useState("") //Para deixar uma cidade setada basta add entre o ("")
    const [data, setData] = useState(null);

    //fazer requisição
    const pesquisaEntradaDados = (city) => {
            //permite fazer requisição para api
        fetch(
            //`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74`
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=49cc8c821cd2aff9af04c9f98c36eb74`
        ).then(res => res.json()).then(data => {
            setData(data)
          })
    };
    //função vai ser chamada toda vez que o usuário digitar algo no input.
    const entradaDados = (e) => {
        //apenas o setCity pode alterar o valor no input
        setCity(e.target.value)
        // Teste da chamada da função. 
        // console.log("mudou!", e.target.value)
    }
    return (
    <View style={{flexDirection: 'row', justifyContent: "center"}}>
        <View>
            <TextInput className="form-control" style={{borderBottomColor:"#CCC", borderBottomWidth:2, padding: 12, 
            marginBottom: 4, color:'white', fontSize: 18}} placeholder="Pesquise uma cidade..."
            onChange={entradaDados} //evento disparado quando há mudança no valor, chamando a função entradaDados
            value={city}
            />
        </View>
        <View>
            <Button 
            onClick={pesquisaEntradaDados}
            title="Ok" type="solid"
            style={styles.btn}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    btn: {
        width:50,
        minWidth: 50,
        marginLeft: 8,
        borderRadius: 10,
        opacity: 0.2
    },

});

export default Busca