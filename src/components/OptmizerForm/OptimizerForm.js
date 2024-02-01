import styled from "@emotion/styled";
import { Alert, Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, Switch, Typography, alpha } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';

import { computeTimeIntervals } from "../../utils/scheduleGrid";
import { findOptimalTime } from "../../scripts/optimalTimes";
import { setOptimalTimes } from "../../redux/scheduleSlice";

const OptimizerContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '40px',
})

const StyledHeader = styled(Typography)({
    fontSize: '25px',
    color: '#505050',
})

const StyledSubHeader = styled(Typography)({
    fontSize: '17.5px',
    color: '#505050',
    fontWeight: 300,
    marginTop: '5px',
})

const StyledInfoText = styled(Typography)({
	fontSize: '12.5px',
    color: '#505050',
    fontWeight: 300,

	'@media (max-width: 768px)': {
		fontSize: '11px',
	},
})

const InfoContainer = styled.div({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '5px',
	marginTop: '20px'
})

const ThreeInputRow = styled.div({
	display: 'flex',
	flexDirection: 'row',
	gap: '15px',

	'@media (max-width: 768px)': {
		flexDirection: 'column',
		gap: '0px'
	},
})

const StyledFormControl = styled(FormControl)({
	flex: 1
})

const GreenSwitch = styled(Switch)({
	'& .MuiSwitch-switchBase.Mui-checked': {
	  color: '#00A63C',
	  '&:hover': {
		backgroundColor: alpha('#00A63C', 0.1),
	  },
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
	  backgroundColor: '#00A63C',
	},
});

const SwitchContainer = styled.div({
	display: 'flex',
	alignItems: 'center',
	gap: '5px',
	marginTop: '15px',
});

export default function OptimizerForm() {
	const { users, dates, start_time, end_time, availability, timezone } = useSelector((state) => state.schedule)
	const [requiredAttendees, setRequiredAttendees] = useState([]);
	const [meetingCount, setMeetingCount] = useState(1);
	const [meetingLength, setMeetingLength] = useState(0.5);
	const [optimizer, setOptimizer] = useState(false);
	const [errorSnackbar, setErrorSnackbar] = useState([false, null]);

	const dispatch = useDispatch();

	const attendeeCount = Object.keys(users).length;

	useEffect(() => {
		if (optimizer) {
			if (Object.keys(availability).length === 0) {
				setErrorSnackbar([true, 'No optimal times found with this criteria']);
			} else {
				const times = findOptimalTime(availability, 'America/New_York', meetingLength * 2, meetingCount, requiredAttendees);
				dispatch(setOptimalTimes(times));
				if (times.length === 0) {
					setErrorSnackbar([true, 'No optimal times found with this criteria']);
				}
			}
		} else {
			dispatch(setOptimalTimes([]));
		}
	}, [availability, dispatch, meetingCount, meetingLength, optimizer, requiredAttendees]);

	const handleStateChange = (event, setter) => {
		const { target : { value } } = event;
		setter(value);
	}

	// Compute the list of total possible meetings: 
	const meetingCountOptions = () => {
		const meetingCountOptions = []
		for (let i = 1 ; i <= dates.length ; i++) {
			meetingCountOptions.push(i);
		}

		return meetingCountOptions;
	}

	const meetingLengthOptions = () => {
		const halfHourIntervals = computeTimeIntervals(start_time, end_time, timezone)[1].length
		const meetingLengths = [];
		for (let i = 1 ; i <= Math.min(halfHourIntervals, 10) ; i++) {
			meetingLengths.push(i / 2);
		}
		return meetingLengths;
	}

	// POTENTIALLY COULD BE ADDED BACK IN THE FUTURE:
	// // Compute the list of valid gap lengths for meetings:
	// const meetingGapOptions = () => {
	// 	const meetingGapOptions = []
	// 	if (meetingCount > 1) {
	// 		const gapDays = dates.length - meetingCount
	// 		const maxGap = Math.floor(gapDays / (meetingCount - 1))
			
	// 		for (let i = 1 ; i <= maxGap ; i++) {
	// 			meetingGapOptions.push(i);
	// 		}
	// 		return meetingGapOptions
	// 	}
	// 	return meetingGapOptions
	// }


    return (
      <OptimizerContainer>
				<Snackbar 
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
					open={errorSnackbar[0]} 
					autoHideDuration={4000} 
					onClose={() => setErrorSnackbar([false, null])}
				>
					<Alert onClose={() => setErrorSnackbar([false, null])} severity="error" sx={{ width: '100%' }}>
						{errorSnackbar[1]}
					</Alert>
				</Snackbar>
				<StyledHeader>
						Schedule Helper
				</StyledHeader>
				<StyledSubHeader>
						Let us help you find your optimal meeting time
				</StyledSubHeader>
				<FormControl sx={{ marginTop: '25px'}}>
					<InputLabel>Required Attendees</InputLabel>
					<Select
						multiple
						disabled={attendeeCount === 0}
						value={requiredAttendees}
						onChange={(event) => handleStateChange(event, setRequiredAttendees)}
						input={<OutlinedInput label="Required Attendees" />}
						renderValue={(selected) => (
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{selected.map((value) => {
									const user = users[value];
									return (
										<Chip key={value} label={user.user_name} />
									)
								})}
							</Box>
						)}
					>
						{Object.keys(users).map((userId) => {
							const user = users[userId];
							return (
							<MenuItem
								key={userId}
								value={userId}
							>
								{user.user_name}
							</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<ThreeInputRow>
					<StyledFormControl sx={{ marginTop: '25px'}}>
						<InputLabel>Number of Meetings</InputLabel>
						<Select
							value={meetingCount}
							onChange={(event) => handleStateChange(event, setMeetingCount)}
							input={<OutlinedInput label="Number of Meetings" />}
						>
						{meetingCountOptions().map((name) => (
								<MenuItem
									key={name}
									value={name}
								>
									{name}
								</MenuItem>
						))}
						</Select>
					</StyledFormControl>
					{/**
					 * POTENTIALLY COULD BE ADDED BACK IN THE FUTURE
					 */}
					{/* <StyledFormControl sx={{ marginTop: '25px'}}>
						<InputLabel>Days Between Meetings</InputLabel>
						<Select
							value={meetingGap}
							onChange={(event) => handleStateChange(event, setMeetingGap)}
							input={<OutlinedInput label="Days Between Meetings" />}
							disabled={meetingGapOptions().length === 0}
						>
						{meetingGapOptions().map((name) => (
								<MenuItem
									key={name}
									value={name}
								>
									{name}
								</MenuItem>
						))}
						</Select>
					</StyledFormControl> */}
					<StyledFormControl sx={{ marginTop: '25px'}}>
						<InputLabel>Meeting Length (Hours)</InputLabel>
						<Select
							value={meetingLength}
							onChange={(event) => handleStateChange(event, setMeetingLength)}
							input={<OutlinedInput label="Meeting Length (Hours)" />}
						>
						{meetingLengthOptions().map((length) => (
								<MenuItem
									key={length}
									value={length}
								>
									{length}
								</MenuItem>
						))}
						</Select>
					</StyledFormControl>
				</ThreeInputRow>
				<InfoContainer>
					<InfoIcon color='disabled' fontSize='xsmall' />
					<StyledInfoText>
						RapidMeet recommended times are marked in 
						<span style={{ color: '#FAC746' }}>
							{' yellow'}
						</span>
					</StyledInfoText>
				</InfoContainer>
				<SwitchContainer>
					<StyledSubHeader sx={{ margin: '0 !important' }}>
						Toggle Schedule Helper
					</StyledSubHeader>
					<GreenSwitch
						onChange={() => setOptimizer((state) => !state)}
					/>
				</SwitchContainer>
      </OptimizerContainer>
    );
}