import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";



import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { GameController } from "../../controller/GameController";
import { GameUser } from "../../domain/gameUser";

const columns: any[] = [
  { id: 'username', label: 'Username', minWidth: 500 },
  { id: 'ratings', label: 'Rating', minWidth: 100 },
];

const LeaderBoardPage = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	////////////////

	const [rating, setRating] = useState<number>(1000);
	const [users, setUsers] = useState<GameUser[]>([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const users = await GameController.getAllUsers();
				const currUser = await GameController.getUser();

				setUsers(users);
				setRating(currUser.ratings[0].rating[0]); // Depends on which language also
			} catch (e) {
				console.log(e);
			}
		};
		fetchUser();
	});

	const LeaderBoardTable = () => {
		return (
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
					{columns.map((column) => (
						<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						>
						{column.label}
						</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{users
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((row) => {
						return (
						<TableRow hover role="checkbox" tabIndex={-1} key={row.username}>
							{columns.map((column) => {
							const value: any = column.id == "ratings" ? row.ratings[0].rating[0] : row.username;
							return (
								<TableCell key={column.id} align={column.align}>
								{value}
								</TableCell>
							);
							})}
						</TableRow>
						);
					})}
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[25]}
				component="div"
				count={users.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			</Paper>
		)
	}

	return (
		<Grid container textAlign="center">
			<Grid item xs={12}><h1>Leaderboards</h1></Grid>
			<Grid item xs={12} textAlign="left"><h4>Rating: </h4></Grid>
			<Grid item xs={12} textAlign="left"><h4>Rank: </h4></Grid>
			<Grid item xs={12}>
				<LeaderBoardTable />
			</Grid>
		</Grid>
	);
}

export default LeaderBoardPage;
