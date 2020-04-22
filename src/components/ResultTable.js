import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(subject, personalScore, classScore) {
  return { subject, personalScore, classScore };
}

const rows = [
  createData('Математика', 4, 6),
  createData('Информатика', 9, 9),
  createData('Физика', 6, 9),
  createData('Русский язык', 10, 8),
  createData('История', 8, 7),
];

export default function ResultTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Предметы</TableCell>
            <TableCell align="center">Личный&nbsp;балл</TableCell>
            <TableCell align="center">Балл&nbsp;класса</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.subject}>
              <TableCell component="th" scope="row">
                {row.subject}
              </TableCell>
              <TableCell align="center">{row.personalScore}</TableCell>
              <TableCell align="center">{row.classScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}