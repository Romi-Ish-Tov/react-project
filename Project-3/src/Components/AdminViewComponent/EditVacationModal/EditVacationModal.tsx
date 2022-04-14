import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import "./EditVacationModal.css";
import { toggleModalEdit } from '../../../Redux/Features/ModalsController';
import { useDispatch, useSelector } from "react-redux";
import { VacationClass } from '../../../Types/class/Vacation';
import axios from 'axios';

function EditVacationModal() {
    const dispatch = useDispatch();

    const state: any = useSelector(state => state);
        
    const initialValue = () => {
        if (state.editVacation.editVacation) {
            return state.editVacation.editVacation
        }
        return 'newVacationAttempt'
    }
    
    const editVacation: any = initialValue();
    

    const [destination, setDestination] = useState("")
    const [price, setPrice] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [returnDate, setReturnDate] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")

    const editVacationPayload = () => {
        const payload = {
            destination: destination,
            price: price,
            startDate: startDate.substring(0, 10),
            returnDate: returnDate.substring(0, 10),
            image: imageUrl,
            description: description,
            vacationId: editVacation != 'newVacationAttempt' ? editVacation.vacationId : null
        }

        editVacation != 'newVacationAttempt' ? editVacationRequest(payload) : addVacationRequest(payload) ;
    }

    const editVacationRequest = async (payload: any) => {
        validatePayload(payload)
        const url = `http://localhost:3001/vacations/${payload.vacationId}`
        try {
            const response = await axios.patch(url, payload)
            const patchResponse = response.data;
        }
        catch (e: any) {
            console.error(e)
            alert(e)
        }
    }

    const addVacationRequest = async (payload: any) => {
        const url = `http://localhost:3001/vacations/addVacation`
        try {
            const response = await axios.post(url, payload)
            
        }
        catch (e: any) {
            console.error(e)
            alert(e)
        }
    }

    const validatePayload = (payload: any) => {
        payload.destination = payload.destination == '' ? payload.destination = editVacation.destination : payload.destination 
        payload.price = payload.price == '' ? payload.price = editVacation.price : payload.price 
        payload.startDate = payload.startDate == '' ? payload.startDate = editVacation.startDate.substring(0, 10) : payload.startDate
        payload.returnDate = payload.returnDate == '' ? payload.returnDate = editVacation.returnDate.substring(0, 10) : payload.returnDate 
        payload.imageUrl = payload.imageUrl == '' ? payload.imageUrl = editVacation.imageUrl : payload.imageUrl 
        payload.description = payload.description == '' ? payload.description = editVacation.description : payload.description 
    }

    return (
        <div>
            <div className='modal-edit' onClick={() => { dispatch(toggleModalEdit()) }} ></div>
            <div className="modal-edit-body">
                <Grid>
                    <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                Edit Vacation
                            </Typography>
                            <form>
                                <Grid container spacing={1}>
                                    <Grid xs={12} sm={6} item>
                                        <TextField onChange={(event: any) => { setDestination(event.target.value) }} placeholder="Enter destination" label="Destination" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField onChange={(event: any) => { setPrice(event.target.value) }} placeholder="Price" label="Price" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField onChange={(event: any) => { setStartDate(event.target.value) }} placeholder="Start date" label="Start date" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid xs={12} sm={6} item>
                                        <TextField onChange={(event: any) => { setReturnDate(event.target.value) }} placeholder="Return date" label="Return date" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(event: any) => { setImageUrl(event.target.value) }} placeholder="Image Url" label="Image Url" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(event: any) => { setDescription(event.target.value) }} label="Description" multiline rows={4} placeholder="Description" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={editVacationPayload} variant="contained" color="primary" fullWidth>Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </div>
    );
}

export default EditVacationModal;