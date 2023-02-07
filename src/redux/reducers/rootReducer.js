import {combineReducers} from 'redux'
import {AuthReducer} from './authReducer'
import {MenuReducer} from './menuReducer'
import {MesasReducer} from './mesasReducer'
import {PersonalReducer} from './personalReducer'
import {InventaryReducer} from './inventaryReducer'
import {SettingsReducer} from './settingsReducer'
import {OrdersReducer} from './ordersReducer'
const rootReducer = combineReducers({
  auth: AuthReducer,
  menu: MenuReducer,
  mesas: MesasReducer,
  personal: PersonalReducer,
  inventary: InventaryReducer,
  settings: SettingsReducer,
  orders: OrdersReducer,
})

export default rootReducer
