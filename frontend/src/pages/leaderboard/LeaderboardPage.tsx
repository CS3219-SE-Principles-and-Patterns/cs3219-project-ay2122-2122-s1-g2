import { useState, useEffect } from "react";

import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import { GameController } from "../../controller/GameController";
import { GameUser } from "../../domain/gameUser";

const columns: any[] = [
  { id: 'username', label: 'Username', minWidth: 500 },
  { id: 'ratings', label: 'Rating', minWidth: 100 },
];

const LeaderBoardPage = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [rating, setRating] = useState<any>(1000);
	const [users, setUsers] = useState<GameUser[]>([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const users = await GameController.getAllUsers();
				users.sort((a: any, b:any) => (getUserMaxRating(b) - getUserMaxRating(a)));
				const currUser = await GameController.getUser();

				setUsers(users);
				setRating(getUserMaxRating(currUser)); // Depends on which language also
			} catch (e) {
				console.log(e);
			}
		};
		fetchUser();
	}, []);

	const getUserMaxRating = (user: any) => {
		const ratings = user.ratings;
		var maxi = -1;
		ratings.forEach((language: any) => {
			maxi = Math.max(maxi, language.rating);
		})
		return maxi;
	}

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
						style={{ 
							minWidth: column.minWidth,
							color: "white",
							backgroundColor: "orange",
							fontWeight: "bold"
						}}
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
							const value: any = column.id === "ratings" ? getUserMaxRating(row) : row.username;
							return (
								<TableCell 
									key={column.id} 
									align={column.align}
								>
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
			<Grid item xs={12} textAlign="left"><h4>Rating: {rating}</h4></Grid>
			<Grid item xs={12}>
				<LeaderBoardTable />
			</Grid>
		</Grid>
	);
}

export default LeaderBoardPage;
