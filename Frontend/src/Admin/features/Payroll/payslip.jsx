import React from 'react';

const PrintPayslip = ({ payroll }) => {
  return (
    <div className="payslip">
      <h2>TillHappens Payslip</h2>
      <div className="empDetails">
        <p>ID: {payroll.PayrollID}</p>
        <p>Name: {`${payroll.FirstName} ${payroll.LastName}`}</p>
        <p>Position: {payroll.Title}</p>
        <p>Email Address: {payroll.Email}</p>
      </div>
      <p>Date: {payroll.PayrollDate}</p>
      <p>BankName: {payroll.BankName}</p>
      <p>AccountNumber: {payroll.AccountNumber}</p>
      <div className="amounts">
        <p><strong>Basic Salary:</strong> {payroll.BasicSalary}</p>
        <p><strong>OvertimeEarnings:</strong> {payroll.OvertimeEarnings}</p>
        <div className="gross">
          <p><strong>Gross Pay: {payroll.GrossPay}</strong></p>
        </div>
        <p><strong>TotalDeductions: {payroll.TotalDeductions}</strong></p>
        <div className="gross">
          <p><strong>NetPay: {payroll.NetPay}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslip;
