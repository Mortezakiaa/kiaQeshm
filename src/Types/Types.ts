export interface OrderLines {
  id: number | null;
  itemCode: string;
  itemName: string;
  qty1: number | null;
  fee: number | null;
  amount: number | null;
  discountPercent: number | null;
  discountAmount: number | null;
  remindNet: number | null;
}

export interface InsertOrderData {
  date: string;
  accountingCode: string;
  customerCode: string;
  saleExpertCode: string;
  inventoryCode: number | null;
  description1: string;
  description2: string;
  discount: number | null;
  orderLines: OrderLines[];
}

export interface DatePickerArguments {
  DateValue: string | undefined;
  onChange: (e: any) => void;
  label: string;
}

export interface MobileDrawer {
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  drawerWidth: number;
  drawer: React.ReactNode;
}

export interface TreeViewFullNameList {
  id: number;
  code: string;
  name: string;
}

export interface TreeViewList {
  id: number;
  code: string;
  childCount: number;
  name: string;
  parentId: number;
  fullName: TreeViewFullNameList[];
  children: TreeViewList[];
}

export interface OrderListsFilter {
  name?: string;
  num1?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderLists {
  rowNumber: number;
  date: string;
  num1: number;
  customerCode: string;
  customerName: string;
  nameAnbar: string;
  description1: string;
  description2: string;
  fee: number;
  amount: number;
  remindNet: number;
}

export interface UserLogin {
  userName: string;
  password: string;
}

export interface InsertCustomer {
  codeMoshtari: string;
  name: string;
  address: string;
  tell: string;
  mobile: string;
}
