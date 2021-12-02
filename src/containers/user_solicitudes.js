import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/All.css';
import imgexport from '../imagenes/imgexport';
import axios from 'axios';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Box,
    Button
} from "reactstrap";


const url = "http://localhost:3001/Ventas/";
const url2 = "http://localhost:3001/Producto/";
const url4 = "http://localhost:3001/Loged/";
let correo = "";
let Productos = {};




export default class user_solicitudes extends Component {
    state = {
        data: [],
        data2: [],
        modaldetalleSolicitud: false,
        modalestadoSolicitud: false,
        modalInsertar: false,
        modalEliminar: false,
        modalleermas: false,
        form: {
            id: '',
            Correo_Usuario: '',
            Estado: '',
            Monto_Total: '',
            Fecha: ''
        },
        tipoModal: ''
    }
    state2 = {
        data: [],
    }


    peticionGet = () => {
        fetch(url4)
            .then((res) => res.json())
            .then(datas => {
                let mail = datas.Correo
                this.renombrarCorreo(mail)

            })
        fetch(url2)
            .then((res) => res.json())
            .then(datas => {
                let mail = datas
                this.prod(mail)

            })


        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
        axios.get(url2).then(response => {
            this.setState({ data2: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    renombrarCorreo = async (mail) => {
        correo = mail
    }
    prod = async (mail) => {
        Productos = mail
        console.log(Productos)
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
        })
    }

    peticionDelete = () => {

        axios.delete(url + this.state.form.id, this.state.form).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
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
                Correo: empresa.Correo,
                Estado: empresa.Estado,
                Monto_Total: empresa.Monto_Total,
                Fecha: empresa.Fecha

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
        this.peticionGet()
    }

    render() {
        const { form } = this.state;
        return (
            <html className="fondoInv">
                <body className="fondoInv" >
                    <header >
                        <img src={imgexport.logo} id="logo" />
                        <rl id="cabezera">
                            <a id="carrito" className="fourth" href="/loged_principal">Volver a Catalogo</a>
                        </rl>
                    </header >
                    <div >
                        <h3 class="carritoTitle"> Inventario de Productos </h3>
                        <br />
                        <button className="botonagregar" onClick={() => { this.setState({ tipoModal: 'insertar' }) }}>Ver Solicitudes</button>
                        <br /><br />
                        <table className="tabla2">
                            <thead Style='background:black;color:black;border:3px solid silver'>
                                <tr>
                                    <th Style='color:white;border:3px solid silver'>Id Cotizacion</th>
                                    <th Style='color:white;border:3px solid silver'>Correo</th>
                                    <th Style='color:white;border:3px solid silver'>Detalles Cotizacion</th>
                                    <th Style='color:white;border:3px solid silver'>Fecha</th>
                                    <th Style='color:white;border:3px solid silver'>Monto Total</th>
                                    <th Style='color:white;border:3px solid silver'>Estado</th>
                                    <th Style='color:white;border:3px solid silver'>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(empr => {
                                    return (
                                        <>
                                            {empr.Correo_Usuario === correo && (
                                                <tr Style='background:white;'>
                                                    <td >{empr.id}</td>
                                                    <td >{empr.Correo_Usuario}</td>
                                                    <td >
                                                        <button Style='font-size:20px;font-weight: bold;' onClick={() => { this.seleccionarEmpresa(empr); this.setState({ modaldetalleSolicitud: true }) }} className="btn btn-primary" >Productos</button>
                                                    </td>
                                                    <td >{empr.Fecha}</td>
                                                    <td>${new Intl.NumberFormat("en-EN").format(empr.Monto_Total)}</td>
                                                    <td >{empr.Estado === false && (<p> En espera</p>)}
                                                        {empr.Estado === true && (<p> Aprobada</p>)}
                                                        {empr.Estado === "Rechazar" && (<p> Rechazada</p>)}</td>
                                                    <td >
                                                        <button Style='font-size:20px;font-weight: bold;' onClick={() => { this.seleccionarEmpresa(empr); this.setState({ modalestadoSolicitud: true }) }} className="btn btn-primary" >Detalle</button>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                        <br /><br /><br />
                    </div>
                    <section id="info">
                        <h3 class="parrafo" >
                            SIGUENOS y contactanos EN NUESTRAS REDES SOCIALES :
                            <a href="https://www.instagram.com/alltecnology.cl/"> <img align="middle" src={imgexport.redes} width="150" /></a>
                        </h3>
                    </section>
                </body>
                <Modal size="auto"
                    centered
                    //centered className="modal fade"
                    isOpen={this.state.modalestadoSolicitud}>
                    <ModalBody>
                        <center><h1 Style='font-size:30px;'>Detalle Estado</h1> </center><br />
                        {this.state.form.Estado === false && (
                            <>
                                <center><p>Estado: En espera</p></center>
                                <center><p>Estamos revisando su Cotizacion, pronto nos pondremos en contacto contigo.</p></center>
                            </>
                        )}
                        {this.state.form.Estado === true && (
                            <>
                                <center><p>Estado: Aprobado</p></center>
                                <center><p>Su cotizacion ha sido aprobada, pronto nos contactaremos contigo para realizar la venta.</p></center>
                            </>
                        )}
                        {this.state.form.Estado === "Rechazar" && (
                            <>
                                <center><p>Estado: Rechazada</p></center>
                                <center><p>Su cotizacion ha sido Rechazada. Enviaremos un correo con el motivo por el cual fue rechazada</p></center>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modalestadoSolicitud: false })}>cerrar</Button>
                    </ModalFooter>
                </Modal>

                <Modal size="auto"
                    centered
                    //centered className="modal fade"
                    isOpen={this.state.modaldetalleSolicitud}>
                    <ModalBody>
                        <center><h1 Style='font-size:30px;'>Detalle Cotizacion</h1> </center><br />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modaldetalleSolicitud: false })}>cerrar</Button>
                    </ModalFooter>
                </Modal>
            </html>
        );
    }
}
