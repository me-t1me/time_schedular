import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2023-05-02';

const Calender = ({Events}) =>  {

    return (
        <Paper>
            <Scheduler
            data={Events}
            height={660}
            >
            <ViewState
                currentDate={currentDate}
            />
            <WeekView
                startDayHour={9}
                endDayHour={20}
            />
            <Appointments />
            <AppointmentForm readOnly />
            </Scheduler>
        </Paper>

    )
};

export default Calender