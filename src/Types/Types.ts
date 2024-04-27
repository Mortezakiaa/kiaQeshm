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

export interface KalaTreeViewFullNameList {
  id: number;
  code: string;
  name: string;
}

export interface KalaTreeViewList {
  id: number;
  code: string;
  childCount: number;
  name: string;
  parentId: number;
  fullName: KalaTreeViewFullNameList[];
  children: KalaTreeViewList[];
}

export interface OrderListsFilter {
  name?: string;
  num1?: number | null;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderLists {
  id: number;
  codeFaktorType: string;
  nameFaktorType: string;
  codeAnbar: string;
  nameAnbar: string;
  num1: number;
  num2: number;
  date: string;
  date2: string;
  sharh: string;
  tozihat: string;
  customerCode: string;
  customerName: string;
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
