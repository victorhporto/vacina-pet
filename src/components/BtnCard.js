import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import styled from "@emotion/styled"
import PropTypes from "prop-types";

const Container = styled(Card)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FullButton = styled(Button)`
  width: 100%;
  flex-direction: column;
  font-size: 40px;

  svg {
    font-size: 40px !important;
  }
`;

export default function BtnCard({onClick}) {
    return (
        <Container>
            <CardContent>
                <FullButton fullWidth startIcon={<AddIcon/>} onClick={onClick}>
                    <div>Novo Pet</div>
                </FullButton>
            </CardContent>
        </Container>
    );
}

BtnCard.propTypes = {
    onClick: PropTypes.func
}