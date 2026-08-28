'use client';

import React from 'react';
import { useGlobalState } from '../../lib/GlobalStateContext';
import styles from './page.module.css';
import { IndianRupee, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function BillsPage() {
  const { bills } = useGlobalState();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock size={16} className={styles.statusPending} />;
      case 'PAID':
        return <CheckCircle size={16} className={styles.statusPaid} />;
      case 'OVERDUE':
        return <AlertTriangle size={16} className={styles.statusOverdue} />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING': return styles.badgePending;
      case 'PAID': return styles.badgePaid;
      case 'OVERDUE': return styles.badgeOverdue;
      default: return '';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalPending = bills
    .filter(b => b.status === 'PENDING' || b.status === 'OVERDUE')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Bills to be Paid</h1>
          <p className={styles.subtitle}>Manage and track your upcoming accounts payable</p>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Total Outstanding</div>
          <div className={styles.summaryValue}>{formatCurrency(totalPending)}</div>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Category</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className={styles.row}>
                <td className={styles.vendorCell}>
                  <div className={styles.vendorName}>{bill.vendor}</div>
                  <div className={styles.billId}>{bill.id}</div>
                </td>
                <td>
                  <span className={styles.category}>{bill.category}</span>
                </td>
                <td className={styles.dateCell}>{bill.dueDate}</td>
                <td className={styles.amountCell}>{formatCurrency(bill.amount)}</td>
                <td>
                  <div className={`${styles.statusBadge} ${getStatusClass(bill.status)}`}>
                    {getStatusIcon(bill.status)}
                    <span>{bill.status}</span>
                  </div>
                </td>
                <td>
                  <button 
                    className={styles.payButton} 
                    disabled={bill.status === 'PAID'}
                  >
                    {bill.status === 'PAID' ? 'Paid' : 'Pay Now'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
