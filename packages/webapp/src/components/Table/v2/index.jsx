import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BsThreeDots } from 'react-icons/bs';
import clsx from 'clsx';
import EnhancedTableHead from './TableHead';
import Button from '../../Form/Button';
import styles from './styles.module.scss';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const More = ({ onClickLoadMore, onClickMore, invisibleRows, dense, colSpan }) => {
  if (invisibleRows <= 0) {
    return null;
  }

  if (onClickMore) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className={clsx(styles.tableCell, dense && styles.dense)}>
          <button onClick={onClickMore} className={styles.moreButton}>
            <BsThreeDots />
            <span>{`+ ${invisibleRows} more`}</span>
          </button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={clsx(styles.loadMoreCell)}>
        <Button
          className={styles.loadMoreButton}
          onClick={onClickLoadMore}
          color={'secondary'}
          sm={true}
        >
          + Load more
        </Button>
      </TableCell>
    </TableRow>
  );
};

More.propTypes = {
  onClickLoadMore: PropTypes.string,
  onClickMore: PropTypes.string,
  invisibleRows: PropTypes.string,
  dense: PropTypes.string,
  colSpan: PropTypes.string,
};

export default function EnhancedTable(props) {
  const {
    columns,
    data,
    showPagination,
    pageSizeOptions = [5, 10, 20, 50],
    minRows = 5,
    dense = true,
    footer,
    onClickMore,
    onRowClick,
    shouldFixTableLayout = false,
  } = props;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(minRows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (event, index) => {
    if (onRowClick) {
      onRowClick(event, index);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClickLoadMore = () => {
    const rowCount = Math.min(rowsPerPage + 5, data.length);
    setRowsPerPage(rowCount);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      data
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          className={clsx(styles.table, shouldFixTableLayout && styles.fixed)}
        >
          <EnhancedTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            dense={dense}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow
                  hover
                  onClick={(event) => handleRowClick(event, index)}
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{ cursor: 'pointer' }}
                  className={styles.tableRow}
                >
                  {columns.map((column) => {
                    const { id, format, accessor, align, columnProps } = column;

                    const dataGetter = accessor || id;
                    const data =
                      typeof dataGetter === 'function' ? dataGetter(row) : row[dataGetter];

                    return (
                      <TableCell
                        key={id}
                        className={clsx(styles.tableCell, dense && styles.dense)}
                        align={align || 'left'}
                        {...columnProps}
                      >
                        {format ? format(row) : data}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 40 : 56) * emptyRows }}>
                <TableCell colSpan={columns.length} sx={{ border: 'none' }} />
              </TableRow>
            )}
            {!showPagination && (
              <More
                onClickMore={onClickMore}
                onClickLoadMore={onClickLoadMore}
                invisibleRows={!showPagination && data.length - rowsPerPage}
                dense={dense}
                colSpan={columns.length}
              />
            )}
            {columns.some(({ Footer }) => !!Footer) && (
              <TableRow className={styles.footer}>
                {columns.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align || 'left'}
                    className={clsx(styles.tableCell, dense && styles.dense)}
                    {...headCell.columnProps}
                  >
                    {headCell.Footer}
                  </TableCell>
                ))}
              </TableRow>
            )}
            {footer ? (
              <TableRow>
                <TableCell className={styles.footerCell} colSpan={columns.length}>
                  {footer()}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={pageSizeOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
}

EnhancedTable.propTypes = {
  // columns,
  //   data,
  //   showPagination,
  //   pageSizeOptions = [5, 10, 20, 50],
  //   minRows = 5,
  //   dense = true,
  //   footer,
  //   onClickMore,
  //   onRowClick,
  //   shouldFixTableLayout
};
