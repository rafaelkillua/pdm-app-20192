import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  DatePicker,
  Fab,
  Container,
  Toast,
  Spinner
} from 'native-base'
import { TextInputMask } from 'react-native-masked-text'

import PaymentsService from '../services/Payments/Payments'

const Payment = props => {
  const paymentId = props.navigation.getParam('paymentId')

  const [paymentTypes, setPaymentTypes] = useState([])
  const [expenseTypes, setExpenseTypes] = useState([])
  const [loading, setLoading] = useState(!!paymentId)

  const [form, setForm] = useState({
    descricao: '',
    dt_vencimento: '',
    valor: '',
    dt_pgto: '',
    vr_multa: '',
    vr_juro: '',
    tipo_pgto: '',
    tipo_despesa: ''
  })

  useEffect(() => {
    const getOptions = async () => {
      try {
        const paymentTypesResult = (await PaymentsService.getPaymentTypes())
          .data
        const expenseTypesResult = (await PaymentsService.getExpenseTypes())
          .data
        setPaymentTypes(paymentTypesResult)
        setExpenseTypes(expenseTypesResult)
      } catch (error) {
        console.error(error)
      }
    }
    getOptions()
  }, [])

  useEffect(() => {
    if (paymentId) {
      const getPayment = async () => {
        try {
          const payment = (await PaymentsService.getPayment(paymentId)).data
          setForm({
            descricao: payment.descricao,
            dt_vencimento: new Date(payment.dt_vencimento),
            valor: payment.valor,
            dt_pgto: new Date(payment.dt_pgto) || '',
            vr_multa: payment.vr_multa || '',
            vr_juro: payment.vr_juro || '',
            tipo_pgto: payment.id_tipo_pgto._id,
            tipo_despesa: payment.id_tipo_despesa._id
          })
          setLoading(false)
        } catch (error) {
          console.error(error)
        }
      }
      getPayment()
    }
  }, [paymentId])

  const submit = async () => {
    try {
      if (paymentId) {
        await PaymentsService.editPayment(paymentId, form)
      } else {
        await PaymentsService.newPayment(form)
      }
      props.navigation.navigate('Dashboard', { refresh: true })
      Toast.show({
        text: `Pagamento ${paymentId ? 'editado' : 'adicionado'} com sucesso!`,
        duration: 3000,
        type: 'success'
      })
    } catch (error) {
      Toast.show({
        text: error.message,
        duration: 3000,
        type: 'danger'
      })
    }
  }

  return (
    <Container>
      <ScrollView>
        {loading ? (
          <Spinner />
        ) : (
          <Form style={styles.form}>
            <Item style={styles.item}>
              <Label style={styles.label}>Descrição</Label>
              <Input
                value={form.descricao}
                style={styles.input}
                onChangeText={descricao =>
                  setForm(prev => ({ ...prev, descricao }))
                }
              />
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Valor Total</Label>
              <TextInputMask
                type={'money'}
                value={form.valor}
                style={styles.input}
                includeRawValueInChangeText
                onChangeText={(m, valor) =>
                  setForm(prev => ({ ...prev, valor }))
                }
              />
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Multa</Label>
              <TextInputMask
                type={'money'}
                value={form.vr_multa}
                style={styles.input}
                includeRawValueInChangeText
                onChangeText={(m, vr_multa) =>
                  setForm(prev => ({ ...prev, vr_multa }))
                }
              />
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Juros</Label>
              <TextInputMask
                type={'money'}
                value={form.vr_juro}
                style={styles.input}
                includeRawValueInChangeText
                onChangeText={(m, vr_juro) =>
                  setForm(prev => ({ ...prev, vr_juro }))
                }
              />
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Tipo Pgto</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholderIconColor="#007aff"
                selectedValue={form.tipo_pgto}
                onValueChange={tipo_pgto =>
                  setForm(prev => ({ ...prev, tipo_pgto }))
                }>
                {paymentTypes.map(payment => (
                  <Picker.Item
                    key={payment._id}
                    label={payment.descricao}
                    value={payment._id}
                  />
                ))}
              </Picker>
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Tipo Despesa</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={form.tipo_despesa}
                onValueChange={tipo_despesa =>
                  setForm(prev => ({ ...prev, tipo_despesa }))
                }>
                {expenseTypes.map(expense => (
                  <Picker.Item
                    key={expense._id}
                    label={expense.descricao}
                    value={expense._id}
                  />
                ))}
              </Picker>
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Data Vencimento</Label>
              <DatePicker
                defaultDate={form.dt_vencimento}
                locale="pt"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="spinner"
                onDateChange={dt_vencimento =>
                  setForm(prev => ({ ...prev, dt_vencimento }))
                }
              />
            </Item>
            <Item style={styles.item}>
              <Label style={styles.label}>Data Pagamento</Label>
              <DatePicker
                defaultDate={form.dt_pgto}
                maximumDate={new Date()}
                locale="pt"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="spinner"
                onDateChange={dt_pgto =>
                  setForm(prev => ({ ...prev, dt_pgto }))
                }
              />
            </Item>
          </Form>
        )}
      </ScrollView>
      <Fab style={styles.fab} position="bottomRight" onPress={submit}>
        <Icon name="save" />
      </Fab>
    </Container>
  )
}

const styles = StyleSheet.create({
  form: {
    paddingLeft: 12,
    paddingBottom: 12
  },
  label: {
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    width: '100%'
  },
  item: {
    height: 50,
    marginBottom: 10
  },
  fab: {
    backgroundColor: '#5067FF'
  },
  datepicker: {
    color: 'gray'
  }
})

export default Payment
