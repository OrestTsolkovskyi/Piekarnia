export interface Products {
  uuid: string,
  image: string,
  name: string,
  description: string,
  allergyInfo: string,
  productionCost: number,
  price: number
}

export interface Bestsellers {
  uuid: string,
  image: string,
  name: string,
  description: string,
  allergyInfo: string,
  productionCost: number,
  price: number
}

export interface Order {
  // eslint-disable-next-line camelcase
  user_uuid: string,
  // eslint-disable-next-line camelcase
  user_orders: [],
  // eslint-disable-next-line camelcase
  order_uuid: string,
  date: string,
  // eslint-disable-next-line camelcase
  order_total: number,
  // eslint-disable-next-line camelcase
  order_production_cost: number,
  status: string,
  orders: [],
  uuid: string,
  image: string,
  name: string,
  description: string,
  allergyInfo: string,
  productionCost: number,
  price: number,
  quantity: number
}

export interface AllOrders {
  // eslint-disable-next-line camelcase
  user_uuid: string,
  // eslint-disable-next-line camelcase
  user_orders: [],
  // eslint-disable-next-line camelcase
  order_uuid: string,
  date: string,
  // eslint-disable-next-line camelcase
  order_total: number,
  // eslint-disable-next-line camelcase
  order_production_cost: number,
  status: string,
  orders: [],
  uuid: string,
  image: string,
  name: string,
  description: string,
  allergyInfo: string,
  productionCost: number,
  price: number,
  quantity: number
}

export interface User {
  name: string,
  username: string,
  password: string,
  token: number
}

export interface Admin {
  name: string,
  username: string,
  password: string,
  token: number
}

export interface Manager {
  name: string,
  username: string,
  password: string,
  token: number
}

export interface Chef {
  name: string,
  username: string,
  password: string,
  token: number
}
