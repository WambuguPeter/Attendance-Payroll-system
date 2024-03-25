import React from 'react';
import './PayrollDetails.scss';
import { useGetPayrollsByIDQuery } from './PayrollApi';
import { ErrorToast, LoadingToast } from '../../Components/Toster';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PayrollDetails = ({ payrollID, onClose }) => {
  const { data: payroll, isError, isLoading } = useGetPayrollsByIDQuery(payrollID);

  const generatePDF = () => {
    if (!payroll || isError) return;
    const doc = new jsPDF();
    doc.text(`TillHappens Payslip`, 10, 10);
    doc.text(`ID: ${payroll[0].PayrollID}`, 10, 20);
    doc.text(`Name: ${payroll[0].FirstName} ${payroll[0].LastName}`, 10, 30);
    doc.text(`Position: ${payroll[0].Title}`, 10, 40);
    doc.text(`Email Address: ${payroll[0].Email}`, 10, 50);
    doc.text(`Date: ${payroll[0].PayrollDate}`, 10, 60);
    doc.text(`BankName: ${payroll[0].BankName}`, 10, 70);
    doc.text(`AccountNumber: ${payroll[0].AccountNumber}`, 10, 80);
    doc.text(`Basic Salary: ${payroll[0].BasicSalary}`, 10, 90);
    doc.text(`OvertimeEarnings: ${payroll[0].OvertimeEarnings}`, 10, 100);
    doc.text(`Gross Pay: ${payroll[0].GrossPay}`, 10, 110);
    doc.text(`TotalDeductions: ${payroll[0].TotalDeductions}`, 10, 120);
    doc.text(`NetPay: ${payroll[0].NetPay}`, 10, 130);
    doc.save("payroll_details.pdf");
  };

  if (isLoading) {
    return <LoadingToast message="Loading payroll details..." />;
  }

  if (isError || !payroll) {
    return <ErrorToast message="Failed to fetch payroll details" />;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>X</button>
        <button className='print' onClick={generatePDF}>Print</button>
        <div className='payslip'>
          <h2>TillHappens Payslip</h2>
          <div className="empDetails">
            <p>ID: {payroll[0].PayrollID}</p>
            <p>Name: {`${payroll[0].FirstName} ${payroll[0].LastName}`}</p>
            <p>Position: {payroll[0].Title}</p>
            <p>Email Address: {payroll[0].Email}</p>
          </div>
          <p>Date: {payroll[0].PayrollDate}</p>
          <p>BankName: {payroll[0].BankName}</p>
          <p>AccountNumber: {payroll[0].AccountNumber}</p>
          <div className="amounts">
            <p><strong>Basic Salary:</strong> {payroll[0].BasicSalary}</p>
            <p><strong>OvertimeEarnings:</strong> {payroll[0].OvertimeEarnings}</p>
            <div className="gross">
              <p><strong>Gross Pay: {payroll[0].GrossPay}</strong></p>
            </div>
            <p><strong>TotalDeductions: {payroll[0].TotalDeductions}</strong></p>
            <div className="gross">
              <p><strong>NetPay: {payroll[0].NetPay}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetails;

