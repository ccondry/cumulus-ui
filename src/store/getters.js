// export const cartProducts = state => {
//   return state.cart.added.map(({ id, quantity }) => {
//     const product = state.products.all.find(p => p.id === id)
//     return {
//       title: product.title,
//       price: product.price,
//       quantity
//     }
//   })
// }

// current software version
export const version = state => state.version
// the base URL string to use for API calls
export const apiBase = state => state.apiBase
// string ID of the current vertical (travel, retail, banking, etc.)
export const vertical = state => state.vertical
// list of all verticals
export const verticals = state => state.verticals
// site contact details (phone number, mailing address, email)
export const contact = state => state.contact
// vertical configuration for site
export const verticalConfig = state => state.verticalConfig
