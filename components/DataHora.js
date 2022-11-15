//rafce
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import moment from 'moment-timezone';

const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
const meses =['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const ItemTempo = ({title, value, unit}) => {
    return(
        <View style={styles.ItemTempo}>
            <Text style={styles.ItemTempoFonte}>{title}</Text>
            <Text style={styles.ItemTempoFonte}>{value}{unit}</Text>
        </View>
    )
}

const DataHora = ({current, lat, lon, timezone}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [index, setIndex] = React.useState(0);

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const mes = time.getMonth();
            const data = time.getDate();
            const dia = time.getDay();
            const hora = time.getHours();
            const horaFormato = hora >= 13 ? hora %12: hora
            const minutos = time.getMinutes();
            const ampm = hora >=12 ? 'pm' : 'am'
    
            setTime((horaFormato < 10? '0'+horaFormato : horaFormato) +
            ':' + (minutos < 10 ? '0'+minutos: minutos) + ' '+ampm)
    
            setDate(dias[dia] + ', '+data+ ' '+ meses[mes])
            
        }, 1000);
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.head}>{time}</Text>
                </View>
                <View>
                    <Text style={styles.subhead}>{date}</Text>
                </View>

                <View style={styles.ItemTempoContainer}>
                    
                    <ItemTempo title="Temperatura Local" value={Math.round(current? current.temp : "")} unit="ºC"/>
                    <ItemTempo title="Humidade do ar" value={current? current.humidity : ""} unit="%"/>
                    <ItemTempo title="Nascer do Sol" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="am"/>
                    <ItemTempo title="Por do Sol" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm'): ""} unit="pm"/>
                </View>

                <View style={styles.rightAlign}>
                    <Text style={styles.localidade}>{timezone}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 20,
        margin: 5, 
        marginLeft: 10,
    },

    head: {
        fontSize:55,
        color:"white",
        fontWeight:'100',
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 'bold'
    },

    subhead: {
        fontSize:35,
        color:"white",
        fontWeight:'300',
    },

    rightAlign: {
        textAlign: 'left',
        marginTop: 20
    },

    localidade: {
        fontSize:30,
        color: 'white',
    },

    ItemTempoContainer: {
        backgroundColor:"#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },

    ItemTempo: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    ItemTempoFonte: {
        color: "white",
        fontSize: 16,
        fontWeight: "100"
    },

});
export default DataHora