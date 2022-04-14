import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from '../../../Redux/Features/ModalsController';
import { EditVacationRedux } from '../../../Redux/Features/EditVacationController';
import "./NewVacation.css"

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export default function NewVacation() {
    const dispatch = useDispatch();
    
    const avatarStyle = { backgroundColor: "#448aff", left: '50%', transform: 'translate(-50%)' }

    return (
        <div className='vacation-card' id='edit-new-vacation-id'>
            <div className="edit-new-vacation">
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <IconButton style={avatarStyle} onClick={() => {
                                dispatch(toggleModalEdit())
                                dispatch(EditVacationRedux(null))
                            }}>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                        }
                        title="Add new vacation"
                    />
                    <CardContent>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
