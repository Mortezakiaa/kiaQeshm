export interface OrderLines {
  itemCode: string;
  qty1: number;
  fee: number;
  amount: number;
  discountPercent: number;
  discountAmount: number;
  remindNet: number;
}
export interface InsertOrderData {
  date: string,
  accountingCode: string,
  customerCode: string,
  saleExpertCode: string,
  inventoryCode: number | null,
  description1: string,
  description2: string,
  discount: number | null,
  orderLines: OrderLines[];
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
