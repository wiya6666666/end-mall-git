export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCount', oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加商品成功')
      }
    })

  }
}