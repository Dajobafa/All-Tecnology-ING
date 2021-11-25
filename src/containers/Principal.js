import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/All.css';
import imgexport from '../imagenes/imgexport';
import BotonNav from '../componentes/BotonNav';

import axios from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Box,
    Button
} from "reactstrap";


const url = "http://localhost:3001/Producto";
export default class Principal extends Component {
    state = {
        data: [],
        count: 1,
        modalInsertar: false,
        modalEliminar: false,
        modalleermas: false,
        form: {
            id: '',
            Nombre: '',
            url_imagen: '',
            Precio: '',
            Cantidad: '',
            Caracteristicas: '',
            tipoModal: ''
        },
        tipoModal: ''
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            this.seleccionarEmpresa();
        })
    }

    peticionDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }


    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });

    }

    seleccionarEmpresa = (empresa) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empresa.id,
                Nombre: empresa.Nombre,
                url_imagen: empresa.url_imagen,
                Precio: empresa.Precio,
                Cantidad: empresa.Cantidad,
                Caracteristicas: empresa.Caracteristicas,
                Tipo: empresa.Tipo
            }
        })

    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form } = this.state;
        return (
            <html>
                <body className="fondo" >
                    <header >
                        <img src={imgexport.logo} id="logo" />
                        <rl id="cabezera">
                            <a id="carrito" className="fourth" href="/register">Ir a Registrarme</a>
                            <a id="carrito" className="fourth" href="/" >Iniciar Sesion </a>
                        </rl>
                    </header >
                    <div >
                        {this.state.count === 1 && (
                            <div>
                                <div >
                                    <BotonNav nombre={"OFERTAS"} action={() => this.setState({ count: 1 })} clase={"seleccion"} />
                                    <BotonNav nombre={"CELULARES"} action={() => this.setState({ count: 2 })} clase={"seccion"} />
                                    <BotonNav nombre={"ACCESORIOS"} action={() => this.setState({ count: 3 })} clase={"seccion"} />
                                </div>
                                <div>
                                    <section id="categorias" >
                                        {this.state.data.map(empresa => {
                                            return (
                                                <div>
                                                    <section class="uno">
                                                        <div>
                                                            <h5>{empresa.Nombre}</h5>
                                                            <img src={empresa.url_imagen} width="auto" height="130px" className="imagenesprincipal" />
                                                            <p class="precio">
                                                                ${new Intl.NumberFormat("en-EN").format(empresa.Precio)}
                                                            </p>
                                                            <button onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalleermas: true }) }} class="leer-mas">Leer más</button>
                                                            <br />
                                                            <a href="" class="Añadir">Añadir al carrito</a>
                                                        </div>

                                                    </section>
                                                </div>
                                            )
                                        })}
                                    </section>
                                </div>
                            </div>
                        )}
                        {this.state.count === 2 && (
                            <div>
                                <div >
                                    <BotonNav nombre={"OFERTAS"} action={() => this.setState({ count: 1 })} clase={"seccion"} />
                                    <BotonNav nombre={"CELULARES"} action={() => this.setState({ count: 2 })} clase={"seleccion"} />
                                    <BotonNav nombre={"ACCESORIOS"} action={() => this.setState({ count: 3 })} clase={"seccion"} />
                                </div>
                                <div>
                                    <section id="categorias" >
                                        {this.state.data.map(empresa => {
                                            return (

                                                <div>
                                                    {empresa.Tipo === "Celular" && (
                                                        <div>
                                                            <section class="uno">
                                                                <div>
                                                                    <h5>{empresa.Nombre}</h5>
                                                                    <img src={empresa.url_imagen} width="auto" height="130px" className="imagenesprincipal" />
                                                                    <p class="precio">
                                                                        ${new Intl.NumberFormat("en-EN").format(empresa.Precio)}
                                                                    </p>
                                                                    <button onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalleermas: true }) }} class="leer-mas">Leer más</button>
                                                                    <br />
                                                                    <a href="" class="Añadir">Añadir al carrito</a>
                                                                </div>

                                                            </section>
                                                        </div>

                                                    )}
                                                </div>
                                            )
                                        })}
                                    </section>
                                </div>
                            </div>
                        )}
                        {this.state.count === 3 && (
                            <div>
                                <div >
                                    <BotonNav nombre={"OFERTAS"} action={() => this.setState({ count: 1 })} clase={"seccion"} />
                                    <BotonNav nombre={"CELULARES"} action={() => this.setState({ count: 2 })} clase={"seccion"} />
                                    <BotonNav nombre={"ACCESORIOS"} action={() => this.setState({ count: 3 })} clase={"seleccion"} />
                                </div>
                                <div>
                                    <section id="categorias" >
                                        {this.state.data.map(empresa => {
                                            return (

                                                <div>
                                                    {empresa.Tipo === "Accesorio" && (
                                                        <div>
                                                            <section class="uno">
                                                                <div>
                                                                    <h5>{empresa.Nombre}</h5>
                                                                    <img src={empresa.url_imagen} width="auto" height="130px" className="imagenesprincipal" />
                                                                    <p class="precio">
                                                                        ${new Intl.NumberFormat("en-EN").format(empresa.Precio)}
                                                                    </p>
                                                                    <button onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalleermas: true }) }} class="leer-mas">Leer más</button>
                                                                    <br />
                                                                    <a href="" class="Añadir">Añadir al carrito</a>
                                                                </div>

                                                            </section>
                                                        </div>

                                                    )}
                                                </div>
                                            )
                                        })}
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                    <div >
                        <Modal size="auto"
                            centered class="modal"
                            aria-labelledby="contained-modal-title-vcenter"
                            //centered class="modal fade"
                            isOpen={this.state.modalleermas}>

                            <ModalHeader>
                                Caracteristicas:
                            </ModalHeader>
                            <ModalBody  >
                                {form && form.Caracteristicas}<br />
                                Quedan {form.Cantidad} productos
                                <br />Imagen:<br />
                                <center><img src={form.url_imagen} width="auto" height="400" className="imagenesprincipal" /></center>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn btn-danger" onClick={() => this.setState({ modalleermas: false })}>cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <section id="info">
                        <h3 class="parrafo" >
                            SIGUENOS y contactanos EN NUESTRAS REDES SOCIALES :
                            <a href="https://www.instagram.com/alltecnology.cl/"> <img align="middle" src={imgexport.redes} width="150" /></a>
                        </h3>
                    </section>
                </body>
            </html>
        )
    }
}
