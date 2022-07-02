import React,{ useState } from 'react'
import {TableContainer,
    TableHead,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
    Box,
    Typography,
    Collapse} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useFetch from '../../Hooks/useFetch'; 

// function Row(props){
//   const {row} = props;
//   const [open,setOpen] = useState(false);

//   return(
//     // <React.Fragment>
//     //   <TableRow sx={{'& > *':{borderBottom:'unset'}}}>
//     //     <TableCell>
//     //       <IconButton
//     //         aria-label='expand row'
//     //         size='small'
//     //         onClick={()=>setOpen(!open)}
//     //       >
//     //         {open? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
//     //       </IconButton>
//     //     </TableCell>
//     //     <TableCell component='th' scope='row'>
//     //       {row.name}
//     //     </TableCell>
//     //     <TableCell align='right'>{row}</TableCell>
//     //     <TableCell align='right'>{row}</TableCell>
//     //     <TableCell align='right'>{row}</TableCell>
//     //     <TableCell align='right'>{row}</TableCell>
//     //   </TableRow>
//     //   <TableRow>
//     //   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//     //       <Collapse in={open} timeout="auto" unmountOnExit>
//     //         <Box sx={{ margin: 1 }}>
//     //           <Typography variant="h6" gutterBottom component="div">
//     //             History
//     //           </Typography>
//     //           <Table size="small" aria-label="purchases">
//     //             <TableHead>
//     //               <TableRow>
//     //                 <TableCell>Date</TableCell>
//     //                 <TableCell>Customer</TableCell>
//     //                 <TableCell align="right">Amount</TableCell>
//     //                 <TableCell align="right">Total price ($)</TableCell>
//     //               </TableRow>
//     //             </TableHead>
//     //             <TableBody>
//     //               {row.history.map((historyRow) => (
//     //                 <TableRow key={historyRow.date}>
//     //                   <TableCell component="th" scope="row">
//     //                     {historyRow.date}
//     //                   </TableCell>
//     //                   <TableCell>{historyRow.customerId}</TableCell>
//     //                   <TableCell align="right">{historyRow.amount}</TableCell>
//     //                   <TableCell align="right">
//     //                     {Math.round(historyRow.amount * row.price * 100) / 100}
//     //                   </TableCell>
//     //                 </TableRow>
//     //               ))}
//     //             </TableBody>
//     //           </Table>
//     //         </Box>
//     //       </Collapse>
//     //     </TableCell>
//     //   </TableRow>
//     // </React.Fragment>
//   )
// }


const Queue = () => {
  const {data,loading,error} = useFetch("http://localhost:5000/admin");
  console.log(data._id);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        {loading ? ("Please wait loading"):(data._id)}
        {/* <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>  
  )
}

export default Queue