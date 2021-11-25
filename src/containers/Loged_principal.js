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
    Button,
} from "reactstrap";
import BotonNav from '../componentes/BotonNav';
import loged_admin from './Loged_admin';


const url = "http://localhost:3001/Producto/";
const url2 = "http://localhost:3001/usuarios/";
const url3 = "http://localhost:3001/Ventas/";
const url4 = "http://localhost:3001/Loged/";

const prodCarrito = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let totalCarrito = [0, 3135];
const venta = {};
let contador = 0;
const fecha = new Date();
let correo="0";
let leng="0";

export default class loged_principal extends Component {
    state = {
        data: [],
        count: 1,
        modalSolicitud: false,
        modalAñadido: false,
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
    state3 = {
        data3: [],
        form: {
        }
    }
    state4 = {
        data4: [],
        form: {
            Correo: '',
            Contraseña: ''

        }
    }

    
    detectarUsuario = () => {
        for(var i=0;i<this.state2.data2.length;i++)
        {
            for(var j=0;j<this.state4.data4.length;j++)
            {
                if(this.state4.data4[i]===this.state2.data2[j])
                   this.seleccionarUser(this.state2.data2)
            }
        }
    }
    
 
    peticionGet = () => {
        fetch(url4)
        .then((res)=>res.json())
        .then(datas =>{           
               let mail =datas.Correo
               this.renombrarCorreo(mail)
                  
        })
        fetch(url3)
        .then((res2)=>res2.json())
        .then(datas2 =>{           
               let lengh =datas2.length
               this.calcularLargo(lengh)
                  
        })
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
    peticionGet3 = () => {
        axios.get(url3).then(response => {
            this.setState({ data3: response.data3 });
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGet3 = () => {
        axios.get(url4).then(response => {
            this.setState({ data4: response.data });
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
    renombrarCorreo=async(mail)=>{
        correo=mail
    }
    calcularLargo=async(va)=>{
        leng=va
    }
    postVenta = async () => {
        
           
        venta["Correo Usuario"]=correo  
        venta["Fecha"] = fecha
        venta["Monto Total"] = totalCarrito[0]
        await axios.post(url3, venta)
            .then(response => {

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

    cerrarSesion=()=>{
        axios.delete(url4+1) 
        window.location.href = "./"
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
    seleccionarUser = (empresa) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empresa.id,
                Nombre: empresa.Nombre,
                Apellido_paterno: empresa.Apellido_paterno,
                Apellido_materno: empresa.Apellido_materno,
                email: empresa.email,
                username: empresa.username,
                password: empresa.password
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
    añadiraCarrito = (id, precio) => {
        let dato = id;
        precio = parseInt(precio)
        return (prodCarrito[dato] = prodCarrito[dato] + 1, totalCarrito[0] = totalCarrito[0] + precio, console.log(prodCarrito))
    }

    quitarCarrito = (id, precio) => {
        let dato = id;
        precio = parseInt(precio)
        return (prodCarrito[dato] = prodCarrito[dato] - 1, totalCarrito[0] = totalCarrito[0] - precio, console.log(prodCarrito))
    }
    carritoProducto = (empresa, prodCarrito, id) => {
        this.añadiraCarrito(empresa.id, empresa.Precio);
        venta[empresa.Nombre] = prodCarrito[empresa.id]

        contador = contador + 1;
        console.log(venta)
    }
    quitarcarritoProducto = (empresa) => {
        venta[empresa.Nombre] = prodCarrito[empresa.id] - 1
        prodCarrito[empresa.id] = prodCarrito[empresa.id] - 1

        console.log(venta)
    }

    render() {
        const { form } = this.state;
        return (
            <html className="fondo">
                <body className="fondo" >
                    {this.state.count === 1 && (
                        <div>
                            <header >
                                <img src={imgexport.logo} id="logo" />
                                <rl Style='margin-left:18%'>
                                    <a id="carrito" className="fourth" href="/Conocenos">Conocenos</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;' onClick={() => this.setState({ count: 4 })}><img src={imgexport.carrito} width="20" height="20" />  Carrito</button>
                                    <a id="carrito" className="fourth" >{correo}</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;width:200px' onClick={() => this.cerrarSesion()}>Cerrar Sesion</button>
                                    
                                </rl>
                            </header >
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
                                                    <section className="uno">
                                                        <div>
                                                            <h5>{empresa.Nombre}</h5>
                                                            <img src={empresa.url_imagen} width="auto" height="130px" className="imagenesprincipal" />
                                                            <p className="precio">
                                                                ${new Intl.NumberFormat("en-EN").format(empresa.Precio)}
                                                            </p>
                                                            <button onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalleermas: true }) }} className="leer-mas">Leer más</button>
                                                            <br />
                                                            <button onClick={() => { this.seleccionarEmpresa(empresa); this.carritoProducto(empresa, prodCarrito, empresa.id); this.setState({ modalAñadido: true }) }} className="Añadir">Añadir al carrito</button>

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
                             <header >
                                <img src={imgexport.logo} id="logo" />
                                <rl Style='margin-left:18%'>
                                    <a id="carrito" className="fourth" href="/Conocenos">Conocenos</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;' onClick={() => this.setState({ count: 4 })}><img src={imgexport.carrito} width="20" height="20" />  Carrito</button>
                                    <a id="carrito" className="fourth" >{correo}</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;width:200px' onClick={() => this.cerrarSesion()}>Cerrar Sesion</button>
                                    
                                </rl>
                            </header >
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
                                                        <section className="uno">
                                                            <div>
                                                                <h5>{empresa.Nombre}</h5>
                                                                <img src={empresa.url_imagen} width="auto" height="130px" className="imagenesprincipal" />
                                                                <p className="precio">
                                                                    ${new Intl.NumberFormat("en-EN").format(empresa.Precio)}
                                                                </p>
                                                                <button onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalleermas: true }) }} className="leer-mas">Leer más</button>
                                                                <br />
                                                                <button onClick={() => { this.seleccionarEmpresa(empresa);this.carritoProducto(empresa, prodCarrito, empresa.id); this.setState({ modalAñadido: true }) }} className="Añadir">Añadir al carrito</button>
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
                             <header >
                                <img src={imgexport.logo} id="logo" />
                                <rl Style='margin-left:18%'>
                                    <a id="carrito" className="fourth" href="/Conocenos">Conocenos</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;' onClick={() => this.setState({ count: 4 })}><img src={imgexport.carrito} width="20" height="20" />  Carrito</button>
                                    <a id="carrito" className="fourth" >{correo}</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;width:200px' onClick={() => this.cerrarSesion()}>Cerrar Sesion</button>
                                    
                                </rl>
                            </header >
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
                                                            <section className="uno">
                                                                <div>
                                                                    <h5>{empresa.Nombre}</h5>
                                                                    <img src={empresa.url_imagen} width="auto" height="130px" className="imagenesprincipal" />
                                                                    <p className="precio">
                                                                        ${new Intl.NumberFormat("en-EN").format(empresa.Precio)}
                                                                    </p>
                                                                    <button onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalleermas: true }) }} className="leer-mas">Leer más</button>
                                                                    <br />
                                                                    <button onClick={() => {this.seleccionarEmpresa(empresa); this.carritoProducto(empresa, prodCarrito, empresa.id); this.setState({ modalAñadido: true }) }} className="Añadir">Añadir al carrito</button>
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
                    {this.state.count === 4 && (
                        <div >
                            <header >
                                <img src={imgexport.logo} id="logo" />
                                <rl Style='margin-left:18%'>
                                    <a id="carrito" className="fourth" href="/Conocenos">Conocenos</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;' onClick={() => this.setState({ count: 1 })}>Volver</button>
                                    <a id="carrito" className="fourth" >{correo}</a>
                                    <button id="carrito" className="fourth" Style='padding:7px  0px 7px 0px;width:200px' onClick={() => this.cerrarSesion()}>Cerrar Sesion</button>
                                    
                                </rl>

                            </header >

                            <div>
                                <h3 className="carritoTitle">Carrito de compras </h3>
                                <section id="categorias" >

                                    <div Style=' background-color:white; padding:20px; border:solid 3px white; width:100%; margin-top:70px;'>
                                        <table className="tabla2">
                                            <thead Style='background:black;color:black;border:3px solid silver'>
                                                <tr>
                                                    <th Style='color:white;border:3px solid silver'>Nombre</th>
                                                    <th Style='color:white;border:3px solid silver'>Precio</th>
                                                    <th Style='color:white;border:3px solid silver'>Cantidad</th>
                                                    <th Style='color:white;border:3px solid silver'>Tipo</th>
                                                    <th Style='color:white;border:3px solid silver'>Añadir</th>
                                                    <th Style='color:white;border:3px solid silver'>Eliminar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state3.data3.map(empresa => {
                                                    <p >{empresa.Correo}</p>
                                                })}
                                                {this.state.data.map(empresa => {
                                                    return (
                                                        <>
                                                            {prodCarrito[empresa.id] !== 0 && (
                                                                <tr Style='background:white;'>

                                                                    <td >{empresa.Nombre}</td>
                                                                    <td >${new Intl.NumberFormat("en-EN").format(empresa.Precio)}</td>
                                                                    <td >{prodCarrito[empresa.id]}</td>
                                                                    <td >{empresa.Tipo}</td>
                                                                    <td >
                                                                        <button Style='font-size:20px;font-weight: bold;' onClick={() => { this.seleccionarEmpresa(empresa); this.carritoProducto(empresa, prodCarrito, empresa.id) }} className="btn btn-primary" >+</button>
                                                                    </td>
                                                                    <td >
                                                                        <button Style='font-size:20px;font-weight: bold; ' onClick={() => { this.seleccionarEmpresa(empresa); this.quitarcarritoProducto(empresa) }} className="btn btn-danger" >-</button>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <div ><br />
                                            <h1 Style='font-size:30px'>Total : ${new Intl.NumberFormat("en-EN").format(totalCarrito[0])}</h1>
                                            <center> <button onClick={() => { this.postVenta(); this.setState({ modalSolicitud: true }); this.setState({ count: 1 }) }} className="btn2 first" >Enviar Cotizacion</button></center>
                                        </div>
                                    </div>

                                </section>
                            </div>
                        </div>
                    )}
                    <div >
                        <Modal size="auto"
                            centered
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
                            centered
                            //centered className="modal fade"
                            isOpen={this.state.modalAñadido}>

                            <ModalBody>
                                <center><h1 Style='font-size:30px;'>Producto Añadido!!</h1> </center><br />
                                <center> <p> Producto :{form.Nombre}</p></center>
                                <center> <p> Precio Producto: ${new Intl.NumberFormat("en-EN").format(form.Precio)}</p></center>

                            </ModalBody>

                            <ModalFooter>
                                <Button className="btn btn-danger" onClick={() => this.setState({ modalAñadido: false })}>cerrar</Button>
                            </ModalFooter>
                        </Modal>
                        <Modal size="auto"
                            centered
                            //centered className="modal fade"
                            isOpen={this.state.modalSolicitud}>

                            <ModalBody>
                                <center><h1 Style='font-size:30px;'>Cotizacion enviada</h1> </center><br />

                                <center> <p>Rebiras un correo dentro de las proximas horas respondiendo a tu solicitud.</p></center>
                                <center> <p>Muchas Gracias por preferirnos!!</p></center><br />
                                <center> <p Style='font-weight: bold;'>Monto Total: ${new Intl.NumberFormat("en-EN").format(totalCarrito[0])} </p></center>
                                <center> <p Style='font-weight: bold;'>Id de Venta: {leng+1} </p></center>
                            </ModalBody>

                            <ModalFooter>
                                <Button className="btn btn-danger" onClick={() => this.setState({ modalSolicitud: false })}>cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <section id="info">



                        <h3 className="parrafo" >
                            SIGUENOS y contactanos EN NUESTRAS REDES SOCIALES :
                            <a href="https://www.instagram.com/alltecnology.cl/"> <img align="middle" src={imgexport.redes} width="150" /></a>
                        </h3>

                    </section>
                </body>




            </html>
        );
    }
}
