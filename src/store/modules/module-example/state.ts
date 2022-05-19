import { User, Admin, Manager } from 'src/store/types'

export interface ExampleStateInterface {
  prop: boolean,
  products: Array<unknown>,
  bestsellers: Array<unknown>,
  orders: Array<unknown>,
  allOrders: Array<unknown>,
  user: User,
  admin: Admin,
  manager: Manager
}

function state (): ExampleStateInterface {
  return {
    prop: false,
    products: [],
    bestsellers: [],
    orders: [],
    allOrders: [],
    user: {} as User,
    admin: {} as Admin,
    manager: {} as Manager
  }
}

export default state
