describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs)/*.trim()*/;
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`//.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs)/*.trim()*/;
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`//.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs)/*.trim()*/;
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`//.trim()
    expect(summary).toEqual(expected)
  });

});
describe('unit test',()=>{
 describe('buildItems',()=>{
   let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  it('should return correct cartItems',()=>{

    let testItems=buildItems(inputs);
    let expected=[
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        counts: 1
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        counts: 2
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        counts:1
        }
    ];
    expect(testItems).toEqual(expected);
    });
  });

 describe('halfPromotions',()=>{
    let testcartItems=[
      {
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        counts: 1
      },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        counts: 2
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        counts:1
      }
    ];

 //   let promotions=loadPromotions();
   it('should return correct subtotalItems',()=>{
     let subtotalItmes=halfPromotions(testcartItems);
    const subExpected=[
      {
      cartItem:{
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        counts:1
      },
      saved:9.00,
    subtotal:9.00
  },
    {
      cartItem:{
        item: {
          id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
        },
        counts:2
      },
      saved:0.00,
      subtotal:12.00
    },
    {
     cartItem: {
        item: {
          id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
        },
        counts:1
      },
      saved:4.00,
      subtotal:4.00
    }
    ];
    expect(subtotalItmes).toEqual(subExpected);
  });
});
 describe('geTotal',()=>{
   let inputs=[
     {
       cartItem:{
         item: {
           id: 'ITEM0001',
           name: '黄焖鸡',
           price: 18.00
         },
         counts:1
       },
       saved:9.00,
       subtotal:9.00
     },
     {
       cartItem:{
         item: {
           id: 'ITEM0013',
           name: '肉夹馍',
           price: 6.00
         },
         counts:2
       },
       saved:0.00,
       subtotal:12.00
     },
     {
       cartItem: {
         item: {
           id: 'ITEM0022',
           name: '凉皮',
           price: 8.00
         },
         counts:1
       },
       saved:4.00,
       subtotal:4.00
     }
   ];
    it('should return correct totalIteams',()=>{
      let totalItems=geTotal(inputs);
      const  totalExpected= {
        subtotalItems: [
          {
            cartItem: {
              item: {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00
              }
              ,
              counts: 1
            }
            ,
            saved: 9.00,
            subtotal: 9.00
          }
          ,
          {
            cartItem: {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              }
              ,
              counts: 2
            }
            ,
            saved: 0.00,
            subtotal: 12.00
          }
          ,
          {
            cartItem: {
              item: {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00
              }
              ,
              counts: 1
            }
            ,
            saved: 4.00,
            subtotal: 4.00
          }
        ],
        total: 38.00,
        halfSaved: 13.00,
        Total: 25.00
      };

expect(totalItems).toEqual(totalExpected);
    });

  });
  });

