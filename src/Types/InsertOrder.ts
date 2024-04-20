export interface InsertOrder {
  InventoryCode: number
  AccountingCode:number
  num2: number
  SalesExpertCode:number
  Date: string
  Description1: string
  Description2: string
  tozihat: string
  CustomerCode: string
  orderLines: [
    {
      ItemCode: string
      ItemName: string
      Qty1: number
      Fee: number
      amount: number
      discountPercent: number
      discount: number
      finalAmount: number
    }
  ];
  discount:number
}
