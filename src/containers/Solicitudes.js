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
    Box
} from "reactstrap";

const ventas={};
const url = "http://localhost:3001/Ventas/";




export default class Solicitudes extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        modalleermas: false,
        form:{
            id:{}
        },
        tipoModal: ''
    }
   

    peticionGet = () => {
        const ventas= axios.get(url)     
        console.log();
        
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
        axios.put(url+this.state.form.id, this.state.form).then(response => {
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
            <html className="fondoInv">             
                <body  className="fondoInv" >
                    <header >
                    <img src={imgexport.logo} id="logo" />
                        <rl id="cabezera">   
                        <a id="carrito" className="fourth" href="/loged_admin">Volver a Catalogo</a>
                        <a id="carrito" className="fourth" href="/">Cerrar Sesion</a>
                        </rl>
                    </header >
                    <div >
                        <h3 class="carritoTitle"> Solicitud de Ventas </h3>
                        <br />
                        <button className="botonagregar" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Producto</button>
                        <br /><br />
                        <table className="tabla">
                            <thead Style='color:white'>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Caracteristicas</th>
                                    <th>Tipo</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(empresa => {
                                    return (
                                        <tr>
                                            <td>{empresa.id}</td>
                                            
                                            <td>
                                                <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(empresa); this.modalInsertar() }}>Editar</button>
                                                {"   "}
                                                <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <br/><br/><br/>
                        
                        <Modal isOpen={this.state.modalInsertar}>
                            <ModalHeader style={{ display: 'block' }}>
                                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id">ID</label>
                                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                                    <br />
                                    <label htmlFor="nombre">Nombre</label>
                                    <input className="form-control" type="text" name="Nombre" id="nombre" onChange={this.handleChange} value={form ? form.Nombre : ''} />
                                    <br />
                                    <label htmlFor="nombre">Url Imagen</label>
                                    <input className="form-control" type="text" name="url_imagen" id="url_imagen" onChange={this.handleChange} value={form ? form.url_imagen : ''} />
                                    <br />
                                    <label htmlFor="nombre">Precio</label>
                                    <input className="form-control" type="text" name="Precio" id="pais" onChange={this.handleChange} value={form ? form.Precio : ''} />
                                    <br />
                                    <label htmlFor="capital_bursatil">Cantidad</label>
                                    <input className="form-control" type="text" name="Cantidad" id="capital_bursatil" onChange={this.handleChange} value={form ? form.Cantidad : ''} />
                                    <br />
                                    <label htmlFor="capital_bursatil">Caracteristicas</label>
                                    <input className="form-control" type="text" name="Caracteristicas" id="capital_bursatil" onChange={this.handleChange} value={form ? form.Caracteristicas : ''} />
                                    <label htmlFor="capital_bursatil">Tipo</label>
                                    <input className="form-control" type="text" name="Tipo" id="Tipo" onChange={this.handleChange} value={form ? form.Tipo : ''} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {this.state.tipoModal === 'insertar' ?
                                    <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                        Insertar
                                    </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                        Actualizar
                                    </button>
                                }
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
