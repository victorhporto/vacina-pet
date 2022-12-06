import {
    Button,
    FormControl, FormControlLabel,
    FormLabel,
    Grid, InputLabel, MenuItem,
    Paper, Radio,
    RadioGroup, Select,
    TextField,
    Typography
} from "@mui/material";
import styled from "@emotion/styled";
import bg from "./img/login-bg.jpg";
import {Component} from "react";
import ImgCard from "./components/ImgCard";
import BtnCard from "./components/BtnCard";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const Login = styled(Paper)`
  height: 400px;
`

const LoginGrid = styled(Grid)`
  height: 100%;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
const LoginTitle = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  text-align: center;
`;

const MainList = styled(Grid)`
  height: 100%;
  background-color: #81BAD0;
`
const ListTitle = styled.div`
  margin-bottom: 20px;
`
const List = styled(Paper)`
  margin-top: 50px;
  padding: 20px;
`

const defaultForm = {
    name: '',
    type: '',
    race: '',
    age: new Date(),
    lastVacine: new Date(),
    vacines: '',
    observations: '',
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 'login',
            selectedPet: null,
            pets: [
                {
                    id: 1,
                    name: 'Amora',
                    type: 'cat',
                    race: `SRD`,
                    age: '2020-05-12',
                    lastVacine: '2022-06-01',
                    vacines: 'V4',
                    observations: 'Ração Premier Adulto',
                },
                {
                    id: 2,
                    name: 'Billy',
                    type: 'dog',
                    race: 'Pedigree',
                    age: '2021-07-18',
                    lastVacine: '2022-06-01',
                    vacines: 'Raiva',
                    observations: '',
                }
            ],
            form: {
                ...defaultForm
            }
        }
    }

    changeForm = (field, value) => {
        const {form} = this.state;
        this.setState({
            form: {
                ...form,
                [field]: value
            }
        })
    }

    save = () => {
        const {form, selectedPet} = this.state;

        if (!selectedPet) {
            const {pets} = this.state;

            pets.push({
                id: pets.length + 1,
                ...form
            });

            this.setState({
                pets,
                form: {...defaultForm},
                route: 'list'
            })
        } else {
            const {pets} = this.state;

            const foundPet = pets.find(pet => pet.id === selectedPet.id);
            const newPet = {
                ...foundPet,
                ...form
            };
            const foundIndex = pets.indexOf(foundPet);
            pets[foundIndex] = newPet;
            this.setState({
                pets,
                form: {...defaultForm},
                route: 'list'
            });
        }
    }

    delete = () => {
        const {pets, selectedPet} = this.state;

        const foundPet = pets.find(pet => pet.id === selectedPet.id);
        const foundIndex = pets.indexOf(foundPet);

        pets.splice(foundIndex, 1);
        this.setState({
            pets,
            form: {...defaultForm},
            route: 'list'
        });
    }

    render() {
        const {route, pets, selectedPet, form} = this.state;

        return (
            <>
                {route === 'login' && (
                    <LoginGrid container alignItems='center' justifyContent='center'>
                        <Grid item xs={5}/>
                        <Grid item xs={4}>
                            <Login elevation={1}>
                                <LoginTitle>
                                    <Typography variant='h2'>Login</Typography>
                                </LoginTitle>
                                <Grid container spacing={2} justifyContent='center'>
                                    <Grid item xs={8}>
                                        <TextField
                                            label='E-mail'
                                            type='text'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            label='Senha'
                                            type='password'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            onClick={() => this.setState({route: 'list'})}
                                        >
                                            Entrar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            fullWidth
                                            onClick={() => this.setState({route: 'list'})}
                                        >
                                            Increver-se
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Login>
                        </Grid>
                    </LoginGrid>
                )}
                {route === 'list' && (
                    <MainList container justifyContent='center'>
                        <Grid item xs={8}>
                            <List elevation={1}>
                                <ListTitle>
                                    <Typography variant='h2'>Pets</Typography>
                                </ListTitle>

                                <Grid container spacing={2} alignItems='stretch'>
                                    <Grid item xs={4}>
                                        <BtnCard
                                            onClick={() => this.setState({
                                                route: 'form',
                                                selectedPet: null
                                            })}
                                        />
                                    </Grid>

                                    {pets.map((pet) => (
                                        <Grid key={pet.id} item xs={4}>
                                            <ImgCard
                                                name={pet.name}
                                                pet={pet.type}
                                                age={pet.age}
                                                lastVacine={pet.lastVacine}
                                                race={pet.race}
                                                onClick={() => this.setState({
                                                    route: 'form',
                                                    selectedPet: pet,
                                                    form: pet
                                                })}
                                            />
                                        </Grid>
                                    ))}

                                </Grid>

                            </List>
                        </Grid>
                    </MainList>
                )}

                {route === 'form' && (
                    <MainList container justifyContent='center'>
                        <Grid item xs={8}>
                            <List elevation={1}>
                                <Button onClick={() => this.setState({
                                    route: 'list',
                                    selectedPet: null,
                                    form: {...defaultForm}
                                })}>
                                    Voltar
                                </Button>
                                <ListTitle>
                                    <Typography
                                        variant='h2'>{!selectedPet ? 'Novo pet' : 'Seu pet'}</Typography>
                                </ListTitle>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                label='Nome do pet'
                                                fullWidth
                                                value={form.name}
                                                onChange={(e) => this.changeForm('name', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <DesktopDatePicker
                                                label="Data de nascimento"
                                                inputFormat="dd/MM/yyyy"
                                                value={form.age}
                                                onChange={(val) => {
                                                    this.changeForm('age', val);
                                                }}
                                                renderInput={(params) => <TextField
                                                    fullWidth {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <DesktopDatePicker
                                                label="Data da última vacina"
                                                inputFormat="dd/MM/yyyy"
                                                value={form.lastVacine}
                                                onChange={(val) => {
                                                    this.changeForm('lastVacine', val);
                                                }}
                                                renderInput={(params) => <TextField
                                                    fullWidth {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl>
                                                <FormLabel>Seu pet é:</FormLabel>
                                                <RadioGroup
                                                    defaultValue="cat"
                                                    name="pet-type"
                                                    value={form.type}
                                                    onChange={(e) => this.changeForm('type', e.target.value)}
                                                >
                                                    <FormControlLabel value="dog" control={<Radio/>}
                                                                      label="Cachorro"/>
                                                    <FormControlLabel value="cat" control={<Radio/>}
                                                                      label="Gato"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Raça</InputLabel>
                                                <Select
                                                    value={form.race}
                                                    onChange={(e) => this.changeForm('race', e.target.value)}
                                                >
                                                    <MenuItem value='SRD'>SRD</MenuItem>
                                                    <MenuItem value='Pedigree'>Pedigree</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={8}/>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Vacinas tomadas"
                                                multiline
                                                fullWidth
                                                maxRows={4}
                                                rows={4}
                                                value={form.vacines}
                                                onChange={(e) => this.changeForm('vacines', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}/>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Outras observações"
                                                multiline
                                                fullWidth
                                                maxRows={4}
                                                rows={4}
                                                value={form.observations}
                                                onChange={(e) => this.changeForm('observations', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}/>
                                        <Grid item xs={4}>
                                            <Button
                                                variant='contained'
                                                fullWidth
                                                onClick={() => this.save()}
                                            >
                                                {selectedPet ? 'Salvar alterações' : 'Salvar novo pet'}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            {selectedPet && (
                                                <Button
                                                    variant='contained'
                                                    fullWidth
                                                    color='error'
                                                    onClick={() => this.delete()}
                                                >
                                                    Remover pet
                                                </Button>
                                            )}
                                        </Grid>

                                    </Grid>
                                </LocalizationProvider>
                            </List>
                        </Grid>
                    </MainList>
                )}

            </>
        );
    }
}

export default App;
