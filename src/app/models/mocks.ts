
export class Mocks {
}

export const ImageIcons = {
  bgImage: 'assets/images/money.jpeg',
}

export const transactions = [
  {
    date: "2025-08-01",
    type: "Deposit",
    amount: 5000,
    status: "Completed",
    metaData: {
      transactionId: "TXN001",
      userId: "USR101",
      location: "Lagos",
      currency: "NGN",
      channel: "Mobile",
      approvalCode: "APR12345",
      remarks: "Salary deposit"
    }
  },
  {
    date: "2025-08-02",
    type: "Withdrawal",
    amount: 2000,
    status: "Pending",
    metaData: {
      transactionId: "TXN002",
      userId: "USR102",
      location: "Abuja",
      currency: "NGN",
      channel: "ATM",
      approvalCode: null,
      remarks: "Cash withdrawal"
    }
  },
  {
    date: "2025-08-03",
    type: "Transfer",
    amount: 3500,
    status: "Completed",
    metaData: {
      transactionId: "TXN003",
      userId: "USR103",
      location: "Ibadan",
      currency: "NGN",
      channel: "Web",
      approvalCode: "APR67890",
      remarks: "Transfer to savings"
    }
  },
  {
    date: "2025-08-04",
    type: "Deposit",
    amount: 1500,
    status: "Failed",
    metaData: {
      transactionId: "TXN004",
      userId: "USR104",
      location: "Enugu",
      currency: "NGN",
      channel: "Branch",
      approvalCode: null,
      remarks: "Cheque deposit"
    }
  },
  {
    date: "2025-08-05",
    type: "Payment",
    amount: 1000,
    status: "Completed",
    metaData: {
      transactionId: "TXN005",
      userId: "USR105",
      location: "Port Harcourt",
      currency: "NGN",
      channel: "POS",
      approvalCode: "APR33445",
      remarks: "Utility bill"
    }
  },
  {
    date: "2025-08-06",
    type: "Withdrawal",
    amount: 3000,
    status: "Completed",
    metaData: {
      transactionId: "TXN006",
      userId: "USR106",
      location: "Kaduna",
      currency: "NGN",
      channel: "ATM",
      approvalCode: "APR55678",
      remarks: "Cash withdrawal"
    }
  },
  {
    date: "2025-08-07",
    type: "Transfer",
    amount: 2500,
    status: "Pending",
    metaData: {
      transactionId: "TXN007",
      userId: "USR107",
      location: "Benin",
      currency: "NGN",
      channel: "Mobile",
      approvalCode: null,
      remarks: "Pending transfer to vendor"
    }
  }
];



export class Transactions {
  constructor(
    public date: string,
    public type: string,
    public amount: number,
    public status: string,
    public metaData: MetaDataObject | any
  ) { }
}

export interface TransactionObject {
  date: string;
  type: string;
  amount: number;
  status: string;
  metaData: MetaDataObject | any;
}

interface MetaDataObject {
  transactionId: string;
  userId: string;
  location: string;
  currency: string;
  channel: string;
  approvalCode?: string | null;
  remarks?: string | null;
}


export interface UserCredentials {
  email: string;
  password: string;
}

export interface OTPVerification {
  otp: string;
}

export const statsCards = [
  { title: 'Total Transactions amount', value: '17', color: 'text-gray-800'},
  { title: 'Pending Transactions', value: '15', color: 'text-yellow-500', status: 'Pending' },
  { title: 'Completed Transactions', value: '145' , color: 'text-green-500', status: 'Completed' },
  { title: 'Failed Transactions', value: '145',color: 'text-red-500', status: 'Failed' }
]

export class StatusCards{
  constructor(
    public title: string,
    public value: string,
    public color: string,
    public status?: string | undefined
  ){}
}

export interface IsMarkedProps{
  status:string | any, 
  marked: boolean
}

export const TransactionType: string[] = ["Deposit", "Payment", "Withdrawal", "Transfer"];

export const TransactionStatus: string[] = ["Completed", "Pending", "Failed"];

export enum TransStatus {
completed = "Completed",
pending = "Pending",
failed = "Failed"
}

export const endpoints = {
  getTransactions: "customers"
}


export interface PaginationParams{
  _page: number, 
  _limit: number   
}