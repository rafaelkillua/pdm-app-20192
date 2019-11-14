import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, StyleSheet } from 'react-native'
import { Container, Fab, Icon, Button } from 'native-base'
import { format } from 'date-fns'

import PaymentsService from '../services/Payments/Payments'

const Dashboard = props => {
  const [payments, setPayments] = useState([])
  const [refreshing, setRefreshing] = useState(true)

  useEffect(() => {
    const getPayments = async () => {
      try {
        const response = (await PaymentsService.getPayments()).data
        setPayments(response)
        setRefreshing(false)
      } catch (error) {
        console.error(error)
      }
    }
    getPayments()
  }, [refreshing])

  return (
    <Container>
      <FlatList
        data={payments}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Button
              icon
              style={styles.editButton}
              onPress={() =>
                props.navigation.navigate('Payment', { paymentId: item._id })
              }>
              <Icon name="edit" type="MaterialIcons" style={styles.editIcon} />
            </Button>
            <Text style={styles.listTitle}>{item.descricao}</Text>
            <Text style={styles.listValue}>
              Vencimento: {format(new Date(item.dt_vencimento), 'dd/MM/yyyy')}
            </Text>
            <Text style={styles.listValue}>
              R$ {(item.valor / 100).toFixed(2)}
            </Text>
            <Text style={styles.listValue}>
              {item.dt_pgto
                ? `Pago em ${format(
                    new Date(item.dt_pgto),
                    "dd/MM/yyyy 'às' HH:mm"
                  )}`
                : 'Não pago'}
            </Text>
            <Text style={styles.listValue}>
              {item.vr_multa
                ? `Multa: ${(item.vr_multa / 100).toFixed(2)}`
                : 'Sem multa'}
            </Text>
            <Text style={styles.listValue}>
              {item.vr_juro
                ? `Juros: ${(item.vr_juro / 100).toFixed(2)}`
                : 'Sem juros'}
            </Text>
            <View style={styles.tiposContainer}>
              <Text style={[styles.tipoPgto, styles.tipo]}>
                {item.id_tipo_pgto.descricao}
              </Text>
              <Text style={[styles.tipoDespesa, styles.tipo]}>
                {item.id_tipo_despesa.descricao}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
      <View>
        <Fab
          style={styles.fab}
          position="bottomRight"
          onPress={() => props.navigation.navigate('Payment')}>
          <Icon name="add" />
        </Fab>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#D5FFFF',
    borderBottomColor: '#4346FF',
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#FFFC45',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  editIcon: {
    color: 'black',
    fontSize: 16
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  listValue: {
    fontSize: 14,
    marginLeft: 8
  },
  tiposContainer: {
    flexDirection: 'row'
  },
  tipo: {
    width: '50%',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 9999,
    padding: 4,
    marginTop: 8
  },
  tipoPgto: {
    borderColor: 'red',
    marginRight: 4
  },
  tipoDespesa: {
    borderColor: 'green',
    marginLeft: 4
  },
  fab: {
    backgroundColor: '#5067FF'
  }
})

export default Dashboard
