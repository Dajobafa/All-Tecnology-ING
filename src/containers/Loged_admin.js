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
    Button
} from "reactstrap";
import BotonNav from '../componentes/BotonNav';


const url = "http://localhost:3001/Producto";
const url2 = "http://localhost:3001/usuarios/";



export default class loged_admin extends Component {
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
    state2 = {
        data2: [],
        form: {
            id: '',
            email: '',
            Apellido_materno: '',
            Apellido_paterno: '',
            Nombre: '',
            username: '',
            password: ''

        }
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGet2 = () => {
        axios.get(url2).then(response => {
            this.setState({ data2: response.data2 });
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
            <html className="fondo">
                <body className="fondo" >



                    <header >
                        <img src={imgexport.logo} id="logo" />
                        <rl id="cabezeraCar">

                            <a id="carrito" className="fourth" href="/Inventario"><img src={imgexport.carrito} width="20" height="20" />  Productos</a>
                            <a id="carrito" className="fourth" href="/Usuarios"><img src={imgexport['foto 4']} width="20" height="20" />  Usuarios</a>
                            <a id="carrito" className="fourth" href="/admin_solicitudes"><img src={imgexport['foto 4']} width="20" height="20" />  Solicitudes</a>
                            <a id="carrito" className="fourth" href="/">Cerrar Sesion</a>
                        </rl>

                    </header >


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
                                                    </div>

                                                )}
                                            </div>
                                        )
                                    })}
                                </section>
                            </div>
                        </div>
                    )}
                    <div >
                        <Modal size="auto"
                            centered className="modal"
                            //centered className="modal fade"
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
                        <Modal size="auto"
                            centered className="modal"
                            //centered className="modal fade"
                            isOpen={this.state.modalAñadido}>

                            <ModalBody>
                                <center> <p> Producto Añadido</p></center>
                            </ModalBody>

                            <ModalFooter>
                                <Button className="btn btn-danger" onClick={() => this.setState({ modalAñadido: false })}>cerrar</Button>
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
