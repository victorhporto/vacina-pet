import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import catImg from '../img/cat-1.jpg';
import dogImg from '../img/dog-1.jpg';
import PropTypes from "prop-types";
import { format } from 'date-fns'

export default function ImgCard({pet, name, age, lastVacine, race, onClick}) {
    console.log(age)
    console.log(lastVacine)


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={pet === 'cat' ? catImg : dogImg}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Data de Nascimento: {format(new Date(age), "dd/MM/yyyy")}
                    <br/>
                    Data da última vacina: {format(new Date(lastVacine), "dd/MM/yyyy")}
                    <br/>
                    Raça: {race}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClick}>Ver Mais</Button>
            </CardActions>
        </Card>
    );
}

ImgCard.propTypes = {
    pet: PropTypes.oneOf(['cat', 'dog']),
    name: PropTypes.string,
    age: PropTypes.number,
    race: PropTypes.string,
    onClick: PropTypes.func,
    lastVacine: PropTypes.string
}