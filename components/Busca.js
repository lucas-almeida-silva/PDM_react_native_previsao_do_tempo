//rafce
import { useState } from 'react';
import { AppState, StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from '@rneui/themed';

const Busca = () => {
    const [pesquisa, setPesquisa] = useState('')
    const [pesquisas, setPesquisas] = useState([])
    const capturarTexto = (pesquisaDigitado) => {

        pesquisaDigitado = pesquisaDigitado.toUpperCase()
        setPesquisa(pesquisaDigitado)
    } 

    const adicionarPesquisa = () => {
        setPesquisas([pesquisa, ...pesquisas])
        setPesquisa("")
        console.log(pesquisas)
    }

    return (
    <View style={{flexDirection: 'row', justifyContent: "center"}}>
        <View>
            <TextInput style={{borderBottomColor:"#CCC", borderBottomWidth:2, padding: 12, 
            marginBottom: 4, color:'white', fontSize: 18}} placeholder="Pesquise uma cidade..."
            onChangeText={capturarTexto}
            value={pesquisa}
            />
        </View>
        <View>
            <Button 
            title="Ok" type="solid"
            onPress={adicionarPesquisa}
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