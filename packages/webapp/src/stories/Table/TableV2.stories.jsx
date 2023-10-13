import React from 'react';
import { componentDecorators } from '../Pages/config/Decorators';
import Table from '../../components/Table/v2';
import styles from '../../components/Table/v2/styles.module.scss';

export default {
  title: 'Components/Tables/V2',
  component: Table,
  decorators: componentDecorators,
};

const BackgroundColorProvider = ({ children }) => (
  <div style={{ background: '#F6FBFA', padding: 10 }}>{children}</div>
);

const transactionsColumns = [
  {
    id: 'transaction',
    numeric: false,
    disablePadding: true,
    label: 'Transaction',
    format: (d) => <b>{d.transaction}</b>,
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    format: (d) => d.date.toLocaleDateString(),
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: true,
    label: 'Amount',
    format: (d) => {
      const sign = +d.amount > 0 ? '+ $' : '- $';
      return (
        <span className={+d.amount > 0 ? styles.positiveValue : styles.negativeValue}>
          {sign}
          {Math.abs(d.amount).toFixed(2)}
        </span>
      );
    },
    align: 'right',
  },
];

const getTransactionData = (length) => {
  return [
    { transaction: 'Laptop', date: new Date(2023, 8, 17), amount: -852 },
    { transaction: 'Wine tour', date: new Date(2023, 7, 17), amount: 526 },
    { transaction: 'Organic something', date: new Date(2023, 7, 7), amount: -50120 },
    { transaction: 'Gas', date: new Date(2023, 6, 15), amount: -521 },
    { transaction: 'Crop Sale', date: new Date(2023, 5, 1), amount: 320 },
    { transaction: 'Farm dog', date: new Date(2023, 4, 5), amount: -300 },
    { transaction: 'CSA box', date: new Date(2023, 4, 4), amount: 525 },
    { transaction: 'Ice cream', date: new Date(2023, 4, 4), amount: 110 },
    { transaction: 'Rain boots', date: new Date(2023, 3, 28), amount: -300 },
    { transaction: 'Bench x4', date: new Date(2023, 3, 17), amount: -250 },
    { transaction: 'Jam', date: new Date(2023, 3, 4), amount: 300 },
    { transaction: 'Machine', date: new Date(2023, 3, 28), amount: -400 },
  ].slice(0, length);
};

export const SimpleTransactions = {
  render: () => <Table columns={transactionsColumns} data={getTransactionData(12)} />,
};

export const TransactionsWithLoadButton = {
  render: () => <Table columns={transactionsColumns} data={getTransactionData(12)} />,
};

export const TransactionsWithPagination = {
  render: () => (
    <Table columns={transactionsColumns} data={getTransactionData(12)} showPagination={true} />
  ),
};

export const TransactionsWithLongText = {
  render: () => (
    <Table
      columns={transactionsColumns}
      data={[
        ...getTransactionData(4),
        {
          transaction:
            'Very very very very very very very very very very very very very very very very very very very long transaction name',
          // 'normal length normal length normal length normal length',
          date: new Date(2023, 5, 1),
          amount: 320,
        },
      ]}
    />
  ),
};

const getCropSalesColumns = () => {
  const mobileView = true;

  return [
    {
      id: 'crop',
      numeric: false,
      disablePadding: true,
      label: 'Crops',
      Footer: mobileView ? undefined : 'DAILY TOTAL',
      format: (d) =>
        mobileView ? (
          <div style={{ paddingTop: 1 }}>
            <div>
              <b>{d.crop}</b>
            </div>
            <div style={{ color: '#9FAABE', fontSize: 12 }}>{d.quantity} kg</div>
          </div>
        ) : (
          d.crop
        ),
    },
    {
      id: 'quantity',
      numeric: true,
      disablePadding: true,
      label: 'Quantity',
      format: (d) => `${Math.abs(d.quantity).toFixed(2)} kg`,
      align: 'right',
      Footer: mobileView ? undefined : <b>3754kg</b>,
      columnProps: {
        style: { width: '25%' },
      },
    },
    {
      id: 'revenue',
      numeric: true,
      disablePadding: true,
      label: 'Revenue',
      format: (d) => {
        const sign = '$';
        return (
          <span>
            {sign}
            {Math.abs(d.revenue).toFixed(2)}
          </span>
        );
      },
      align: 'right',
      Footer: mobileView ? undefined : <b>$17571.5</b>,
      columnProps: {
        style: { width: '25%' },
      },
    },
  ];
};

const getCropSalenData = (length) => {
  return [
    { crop: 'White corn, Corn', quantity: 2124, revenue: 8796.0 },
    { crop: 'Koto, Buckwheat', quantity: 724, revenue: 692.5 },
    { crop: 'Lutz green leaf, Beetroot', quantity: 58, revenue: 210.0 },
    { crop: 'Cox’s orange pippin, Apple', quantity: 48, revenue: 340.0 },
    { crop: 'Macoun, Apples', quantity: 124, revenue: 1234.0 },
    { crop: 'Butter Boy Hybrid, Butternut ', quantity: 24, revenue: 785.5 },
    { crop: 'King Edward, Potato', quantity: 58, revenue: 237.0 },
    { crop: 'Blanco Veneto, Celeriac', quantity: 56, revenue: 895.0 },
    { crop: 'Hollow Crown, Parsnips ', quantity: 23, revenue: 354.0 },
    { crop: 'Early White Hybrid, Cauliflower', quantity: 87, revenue: 789.5 },
  ].slice(0, length);
};

const Footer = (props) => (
  <div
    style={{
      width: '100%',
      backgroundColor: '#f3f6fb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      paddingLeft: 20,
      paddingRight: 12,
    }}
  >
    <div>DAILY TOTAL</div>
    <div>
      <b>3754 kg</b>
    </div>
    <div>
      <b>$17571.5</b>
    </div>
  </div>
);

export const CropSales = {
  render: () => (
    <BackgroundColorProvider>
      <Table
        columns={getCropSalesColumns()}
        data={getCropSalenData(10)}
        minRows={10}
        shouldFixTableLayout={true}
      />
    </BackgroundColorProvider>
  ),
};

// Employees labour
const getEmployeesLabourColumns = () => {
  return [
    {
      id: 'employee',
      numeric: false,
      disablePadding: true,
      label: 'Employee',
      Footer: 'DAILY TOTAL',
    },
    {
      id: 'time',
      numeric: true,
      disablePadding: true,
      label: 'Time',
      format: (d) => `${d.time} h`,
      align: 'right',
      Footer: <b>89 h</b>,
    },
    {
      id: 'labourCost',
      numeric: true,
      disablePadding: true,
      label: 'Labour cost',
      format: (d) => {
        const sign = '$';
        return (
          <span>
            {sign}
            {Math.abs(d.labourCost).toFixed(2)}
          </span>
        );
      },
      align: 'right',
      Footer: <b>$3732.50</b>,
    },
  ];
};

const getEmployeesLabourData = (length) => {
  return [
    { employee: 'Sue D.', time: 1.25, labourCost: 0.0 },
    { employee: 'L.F. C.', time: 77.5, labourCost: 3692.5 },
    { employee: 'Joey.', time: 2.75, labourCost: 0.0 },
    { employee: 'Farmie.', time: 7.5, labourCost: 40.0 },
  ].slice(0, length);
};

export const EmployeesLabour = {
  render: () => (
    <BackgroundColorProvider>
      <Table
        columns={getEmployeesLabourColumns()}
        data={getEmployeesLabourData(10)}
        minRows={10}
        onClickMore={() => console.log('Go to labour page')}
      />
    </BackgroundColorProvider>
  ),
};

// Tasks labour
const getTasksLabourColumns = () => {
  return [
    {
      id: 'task',
      numeric: false,
      disablePadding: true,
      label: 'Tasks',
      Footer: 'DAILY TOTAL',
      component: 'th',
    },
    {
      id: 'time',
      numeric: true,
      disablePadding: true,
      label: 'Time',
      format: (d) => `${d.time} h`,
      align: 'right',
      Footer: <b>89 h</b>,
      maxWidth: 80,
    },
    {
      id: 'labourCost',
      numeric: true,
      disablePadding: true,
      label: 'Labour cost',
      format: (d) => {
        const sign = '$';
        return (
          <span>
            {sign}
            {Math.abs(d.labourCost).toFixed(2)}
          </span>
        );
      },
      align: 'right',
      Footer: <b>$3732.50</b>,
    },
  ];
};

const getTasksLabourData = (length) => {
  return [
    { task: 'Harvest', time: 51.25, labourCost: 2500 },
    { task: 'Weeding', time: 13.5, labourCost: 450.5 },
    { task: 'Packing', time: 6.75, labourCost: 200 },
    { task: 'Cleaning', time: 6.5, labourCost: 232 },
    { task: 'Transport', time: 6, labourCost: 200 },
    { task: 'Livestock feeding', time: 5, labourCost: 150 },
  ].slice(0, length);
};

export const TasksLabour = {
  render: () => (
    <BackgroundColorProvider>
      <Table
        columns={getTasksLabourColumns()}
        data={getTasksLabourData(10)}
        minRows={5}
        onClickMore={() => console.log('Go to labour page')}
      />
    </BackgroundColorProvider>
  ),
};
