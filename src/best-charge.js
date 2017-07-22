function bestCharge(selectedItems) {

  let cartItems = buildItems(selectedItems);
   let subtotalItems =halfPromotions(cartItems);
   let totalItems=geTotal(subtotalItems);
    let receiptItems=printItems(totalItems);
    return receiptItems;
}

function buildItems(selectedItems) {
  let selecteditem;
  let cartItems = [];
  let allItems = loadAllItems();

  for (selecteditem of selectedItems) {
    let splitedItem = selecteditem.split(" x ");
    let id = splitedItem[0];
    let counts = parseFloat(splitedItem[1] || 1);
    const item = allItems.find(item => item.id === id);
    cartItems.push({item:item,counts:counts})
  }

  return cartItems;
}

function halfPromotions(cartItems) {
return cartItems.map(cartItem=>{
  let promotion,promotions;
  promotions=loadPromotions();
  let saved=0,subtotal;
  promotion=promotions[1];
  //promotion=promotions.find((promotion)=>promotion.items.includes(cartItem.item.id));
  let a=promotion.items.includes(cartItem.item.id);
  if(a) {
   subtotal= saved=(cartItem.item.price*cartItem.counts)/2;
  }
  else{
    subtotal=cartItem.item.price*cartItem.counts;
  }
  return {cartItem,saved,subtotal};
});

 }

function geTotal(subtotalItems) {

  let total=0,halfSaved=0,Total=0;
  for(let subtotalItem of subtotalItems) {
    total += (subtotalItem.subtotal + subtotalItem.saved);
    halfSaved += subtotalItem.saved;
  }
  if(halfSaved === 0) {
    Total=total;
  }
  else{
    if(total>=30)
    {
      if((total-6)<=(total-halfSaved)){
        Total=total-6;
      }
      else{
        Total=total-halfSaved;
      }
    }
    else{
      Total=total-halfSaved;
    }
  }
return {subtotalItems,total,halfSaved,Total};
}

function printItems(totalItems) {

  let Receipt, firstPrint,secondPrint,thirdPrint,orderlist='\n';
  let receiptItems=totalItems;

  for(let subtotalItem of receiptItems.subtotalItems){
  orderlist=orderlist+subtotalItem.cartItem.item.name + ' x ' + subtotalItem.cartItem.counts + ' = ' + subtotalItem.cartItem.counts*subtotalItem.cartItem.item.price + '元' + '\n';
  }
  firstPrint= '\n'+'============= 订餐明细 ============='  +
    orderlist +
    '-----------------------------------' + '\n' +
    '使用优惠:' + '\n' + '满30减6元，省6元' +'\n'+
    '-----------------------------------' + '\n' +
    '总计：' + receiptItems.Total + '元' +'\n'+ '===================================';

  secondPrint='\n'+'============= 订餐明细 ============='  +
    orderlist +
    '-----------------------------------' + '\n' +
    '使用优惠:' + '\n' + '指定菜品半价(黄焖鸡，凉皮)，省' +
   receiptItems.halfSaved + '元' +'\n'+
    '-----------------------------------' + '\n' +
    '总计：' + receiptItems.Total+ '元' + '\n'+'===================================';

  thirdPrint='\n'+'============= 订餐明细 ============='  +
    orderlist +
    '-----------------------------------' + '\n' +
    '总计：' +receiptItems.Total + '元' +'\n'+ '===================================';

 if(receiptItems.halfSaved === 0){
   Receipt= thirdPrint;
  }
  else {
   if(receiptItems.Total === (receiptItems.total - 6)) {
     Receipt=firstPrint;
   }
   if (receiptItems.Total === (receiptItems.total - receiptItems.halfSaved)) {
     Receipt=secondPrint;
   }
 }
return Receipt;
}
