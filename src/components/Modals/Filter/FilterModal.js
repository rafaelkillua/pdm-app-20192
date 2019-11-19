import React from 'react'
import { Text, StyleSheet, Modal } from 'react-native'
import {
  Form,
  Item,
  Label,
  Picker,
  DatePicker,
  Icon,
  Button,
  CheckBox,
  Radio
} from 'native-base'

const FilterModal = props => {
  const {
    isFiltersOpen,
    setIsFiltersOpen,
    filters,
    setFilters,
    paymentTypes,
    expenseTypes
  } = props

  return (
    <Modal
      animationType="slide"
      visible={isFiltersOpen}
      onRequestClose={() => setIsFiltersOpen(false)}>
      <Form style={styles.modalContainer}>
        <Item style={styles.item}>
          <Label style={styles.label}>Todas as Datas</Label>
          <CheckBox
            checked={filters.isAll}
            onPress={() =>
              setFilters(prev => ({ ...prev, isAll: !prev.isAll }))
            }
          />
        </Item>
        <Item style={styles.item}>
          <Label style={styles.label}>Data de Vencimento: Início</Label>
          <DatePicker
            defaultDate={filters.startDate}
            maximumDate={filters.endDate}
            locale="pt"
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType="fade"
            androidMode="spinner"
            disabled={filters.isAll}
            onDateChange={startDate =>
              setFilters(prev => ({ ...prev, startDate }))
            }
          />
        </Item>
        <Item style={styles.item}>
          <Label style={styles.label}>Data de Vencimento: Final</Label>
          <DatePicker
            defaultDate={filters.endDate}
            minimumDate={filters.startDate}
            locale="pt"
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType="fade"
            androidMode="spinner"
            disabled={filters.isAll}
            onDateChange={endDate => setFilters(prev => ({ ...prev, endDate }))}
          />
        </Item>
        <Item style={styles.item}>
          <Label style={styles.label}>Todos os tipos</Label>
          <Radio
            style={styles.radio}
            selected={filters.isPaid === null}
            onPress={() => setFilters(prev => ({ ...prev, isPaid: null }))}
          />
          <Label style={styles.label}>Pagos</Label>
          <Radio
            style={styles.radio}
            selected={filters.isPaid}
            onPress={() => setFilters(prev => ({ ...prev, isPaid: true }))}
          />
          <Label style={styles.label}>Não Pagos</Label>
          <Radio
            style={styles.radio}
            selected={filters.isPaid === false}
            onPress={() => setFilters(prev => ({ ...prev, isPaid: false }))}
          />
        </Item>
        <Item style={styles.item}>
          <Label style={styles.label}>Tipo Pgto</Label>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholderIconColor="#007aff"
            selectedValue={filters.paymentType}
            onValueChange={paymentType =>
              setFilters(prev => ({ ...prev, paymentType }))
            }>
            <Picker.Item label="Todos" value="all" />
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
            // eslint-disable-next-line react-native/no-inline-styles
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={filters.expenseType}
            onValueChange={expenseType =>
              setFilters(prev => ({ ...prev, expenseType }))
            }>
            <Picker.Item label="Todos" value="all" />
            {expenseTypes.map(expense => (
              <Picker.Item
                key={expense._id}
                label={expense.descricao}
                value={expense._id}
              />
            ))}
          </Picker>
        </Item>
        <Button
          rounded
          onPress={() => setIsFiltersOpen(false)}
          style={styles.backButton}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={{ color: 'white', width: '100%', textAlign: 'center' }}>
            Voltar
          </Text>
        </Button>
      </Form>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    color: 'black'
  },
  item: {
    width: '100%',
    height: 50,
    marginBottom: 10
  },
  backButton: {
    marginTop: 16,
    width: '50%',
    backgroundColor: '#5067FF'
  },
  radio: {
    marginRight: 8
  }
})

export default FilterModal
