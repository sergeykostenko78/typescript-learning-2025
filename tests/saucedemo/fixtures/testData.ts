export interface Product {
    title: string;
    price: number;
}

export interface CartItem {
    title: string;
    quantity: number;
}

export interface CheckoutInfo {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export const TEST_USERS = {
      standard: { username: 'standard_user', password: 'secret_sauce' },
      invalid: { username: 'standard_user', password: 'wrong_one' },
      locked: { username: 'locked_out_user', password: 'secret_sauce' },
}

export const PRODUCTS = {
      backpack: 'Sauce Labs Backpack',
      bikeLight: 'Sauce Labs Bike Light',
      shirt: 'Sauce Labs Bolt T-Shirt',
      onesie: 'Sauce Labs Onesie',
    }