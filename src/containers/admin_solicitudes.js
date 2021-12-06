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
const url4 = "http://localhost:3001/Loged/";
let correo = "";
let msolicitud = {};
let productos = "";




export default class admin_solicitudes extends Component {
    state = {
        data: [],
        modaldetalleSolicitud: false,
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

    aprobar = (empresa) => {
        fetch(url)
            .then((res) => res.json())
            .then(datas2 => {
                let solicitud = datas2[empresa.id - 1]
                solicitud["Estado"] = true
                axios.put(url + this.state.form.id, solicitud).then(response => {
                    this.peticionGet();
                })
            })
    }
    datosSoli = (empresa) => {
        fetch(url)
            .then((res) => res.json())
            .then(datas2 => {
                let solicitud = datas2[empresa.id - 1]
                solicitud["Estado"] = true
                msolicitud = solicitud
            })
        console.log(msolicitud)

    }
    espera = (empresa) => {
        fetch(url)
            .then((res) => res.json())
            .then(datas3 => {
                let solicitud = datas3[empresa.id - 1]
                solicitud["Estado"] = false
                console.log(solicitud)
                axios.put(url + this.state.form.id, solicitud).then(response => {
                    this.peticionGet();
                })
            })
    }
    Rechazar = (empresa) => {
        fetch(url)
            .then((res) => res.json())
            .then(datas3 => {
                let solicitud = datas3[empresa.id - 1]
                solicitud["Estado"] = "Rechazar"
                console.log(solicitud)
                axios.put(url + this.state.form.id, solicitud).then(response => {
                    this.peticionGet();
                })
            })
    }
    peticionGet = () => {
        fetch(url4)
            .then((res) => res.json())
            .then(datas => {
                let mail = datas.Correo
                this.renombrarCorreo(mail)

            })

        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }
    renombrarCorreo = async (mail) => {
        correo = mail
    }
    prodCot = (empresa) => {
        fetch(url)
            .then((res2) => res2.json())
            .then(datas2 => {
                let mail2 = datas2[empresa.id - 1]
                this.cot(mail2)
                console.log(mail2)
                this.peticionGet();
            })
    }
    cot = (mail) => {
        productos = mail
        delete productos.Fecha
        delete productos.Monto_Total
        delete productos.Estado
        delete productos.id
        delete productos.Correo_Usuario
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
    empresaAprobada = (empresa) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empresa.id,
                Correo: empresa.Correo,
                Estado: true,
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
                            <a id="carrito" className="fourth" href="/loged_admin">Volver a Catalogo</a>
                        </rl>
                    </header >
                    <div >
                        <h3 class="carritoTitle"> Inventario de Productos </h3>
                        <br />
                        <table className="tabla2">
                            <thead Style='background:black;color:black;border:3px solid silver'>
                                <tr>
                                    <th Style='color:white;border:3px solid silver'>Id Solicitud</th>
                                    <th Style='color:white;border:3px solid silver'>Correo</th>
                                    <th Style='color:white;border:3px solid silver'>Detalle</th>
                                    <th Style='color:white;border:3px solid silver'>Fecha</th>
                                    <th Style='color:white;border:3px solid silver'>Monto Total</th>
                                    <th Style='color:white;border:3px solid silver'>Estado</th>
                                    <th Style='color:white;border:3px solid silver'>Aprobar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(empr => {
                                    return (
                                        <>
                                            <tr Style='background:white;'>
                                                <td >{empr.id}</td>
                                                <td >{empr.Correo_Usuario}</td>
                                                <td >{empr.Fecha}</td>
                                                <td >
                                                    <button Style='font-size:20px;font-weight: bold;' onClick={() => { this.seleccionarEmpresa(empr); this.prodCot(empr); this.setState({ modaldetalleSolicitud: true }); console.log(productos) }} className="btn btn-primary" >Detalles</button>
                                                </td>
                                                <td>${new Intl.NumberFormat("en-EN").format(empr.Monto_Total)}</td>
                                                {empr.Estado === false && (
                                                    <>
                                                        <td ><p> En espera</p></td>
                                                        <td >
                                                            <button Style='font-size:20px;font-weight: bold; background-color:green;border-color:green' onClick={() => { this.seleccionarEmpresa(empr); this.aprobar(empr) }} className="btn btn-primary" >Aprobar</button>
                                                            <button Style='font-size:20px;font-weight: bold; background-color:red;border-color:red' onClick={() => { this.seleccionarEmpresa(empr); this.Rechazar(empr) }} className="btn btn-primary" >Rechazar</button>
                                                        </td>
                                                    </>)}
                                                {empr.Estado === true && (
                                                    <>
                                                        <td ><p> Aprobada</p></td>
                                                        <td >
                                                            <button Style='font-size:20px;font-weight: bold; background-color:#17A589;border-color:#17A589' onClick={() => { this.seleccionarEmpresa(empr); this.espera(empr) }} className="btn btn-primary" >Poner en Espera</button>
                                                        </td>
                                                    </>)}
                                                {empr.Estado === "Rechazar" && (
                                                    <>
                                                        <td ><p> Rechazada</p></td>
                                                        <td >
                                                            <button Style='font-size:20px;font-weight: bold; background-color:#17A589;border-color:#17A589' onClick={() => { this.seleccionarEmpresa(empr); this.espera(empr) }} className="btn btn-primary" >Poner en Espera</button>
                                                        </td>
                                                    </>)}

                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                        <br /><br /><br />


                        <Modal size="auto"
                            centered
                            //centered className="modal fade"
                            isOpen={this.state.modaldetalleSolicitud}>

                            <ModalBody>
                                <center><h1 Style='font-size:30px;'>Detalle Cotizacion</h1> </center><br />
                                ID Cotizacion:<br />
                                {this.state.form.id}<br /><br />
                                Productos:<br />
                                {JSON.stringify(productos)}<br /><br />
                                Monto Total:  <br />
                                ${new Intl.NumberFormat("en-EN").format(this.state.form.Monto_Total)}<br /><br />
                                Fecha Cotizacion:  <br />
                                {this.state.form.Fecha}<br /><br />
                            </ModalBody>

                            <ModalFooter>
                                <Button className="btn btn-danger" onClick={() => this.setState({ modaldetalleSolicitud: false })}>cerrar</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.modalInsertar}>
                            <ModalHeader style={{ display: 'block' }}>
                                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id">ESTADO</label>
                                    <input className="form-control" type="boolean" name="Estado" id="id" onChange={this.handleChange} value={form ? form.Estado : ''} />
                                    <br />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-primary" onClick={() => this.aprobar()}>Actualizar</button>
                                <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modalEliminar}>
                            <ModalBody>
                                Estás seguro que deseas eliminar el Accesorio {form && form.Nombre}
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                                <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
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
        );
    }
}
