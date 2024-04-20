export interface OrderLines {
  ItemCode: string;
  ItemName: string;
  Qty1: number;
  Fee: number;
  amount: number;
  discountPercent: number;
  discount: number;
  finalAmount: number;
}
export interface InsertOrderData {
  InventoryCode: number | null;
  AccountingCode: number | null;
  num2: number | null;
  SalesExpertCode: number | null;
  Date: string;
  Description1: string;
  Description2: string;
  CustomerCode: string;
  orderLines: OrderLines[];
  discount: number | null;
}
export interface DatePickerArguments {
  DateValue: string | undefined;
  onChange: (e: any) => void;
}
export interface MobileDrawer {
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  drawerWidth: number;
  drawer: React.ReactNode;
}
