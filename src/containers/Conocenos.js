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


const url = "http://localhost:3001/Producto/";



export default class Conocenos extends Component {
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
        return (
            <html className="fondo">
                <body className="fondo" >
                    <header >
                        <img src={imgexport.logo} id="logo" />
                        <rl id="cabezera">
                            <a id="carrito" className="fourth" href="/">Cerrar Sesion</a>
                            <a id="carrito" className="fourth" href="/loged_principal"><img src={imgexport.carrito} width="20" height="20" />  Volver al Catalogo</a>
                        </rl>
                    </header >
                    {this.state.count === 1 && (
                        <div>
                            <div >
                                <BotonNav nombre={"NOSOTROS"} action={() => this.setState({ count: 1 })} clase={"seleccion"} />
                                <BotonNav nombre={"GARANTIAS"} action={() => this.setState({ count: 2 })} clase={"seccion"} />
                                <BotonNav nombre={"METODOS DE PAGO"} action={() => this.setState({ count: 3 })} clase={"seccion"} />
                            </div>
                            <body className="nosotros">
                                <h3>QUIÉNES SOMOS</h3><br />
                                <br /><p>  All Tecnology es una empresa de computación, fundada en Santiago, en el año 2019. Nacimos como un pequeño emprendimiento familiar, el cual se fue desarrollando y creciendo con el tiempo. Al día de hoy All Tecnology ofrece en su sitio web y brinda una experiencia de compra personalizada y segura.</p><br />

                                <h3>QUÉ HACEMOS</h3><br />
                                <p> Vendememos difentes modelos de celulares de marcaso tales como APPLE , HUAWEI y SAMSUNG. Por otra parte tambien tenemos dentro de nuestro catalogo diferentes accesorios que podremos utilizar para complementar la experiencia del uso de los dispositivos mobiles.</p><br />

                                <h3> CÓMO LO HACEMOS</h3><br />
                                <p>A través de una constante innovación y desarrollo de tecnologías, estudios de tendencias y una variada oferta de productos y servicios. Nuestra oferta incluye una atención personalizada y precios competitivos.</p><br />
                            </body>
                        </div>
                    )}
                    {this.state.count === 2 && (
                        <div>
                            <div >
                                <BotonNav nombre={"NOSOTROS"} action={() => this.setState({ count: 1 })} clase={"seccion"} />
                                <BotonNav nombre={"GARANTIAS"} action={() => this.setState({ count: 2 })} clase={"seleccion"} />
                                <BotonNav nombre={"METODOS DE PAGO"} action={() => this.setState({ count: 3 })} clase={"seccion"} />
                            </div>
                            <body className="nosotros">
                                <h3>Plazo y Cobertura de Garantia</h3><br />
                                <br /><p>  3 meses (90 días) a partir de la fecha de compra, de acuerdo a la normativa legal. En general, cubre productos con fallas de fábrica. La forma en que aplica la garantía depende del tipo de producto y la marca.</p><br />
                                <h3>¿Y si mi producto falla después de 90 días?</h3><br />
                                <p>All Tecnology podrá enviar el producto al servicio técnico autorizado de la marca actuando sólo como intermediario entre el cliente y el servicio técnico; el plazo de revisión, la aceptación o rechazo de la garantía será responsabilidad del servicio técnico autorizado. En caso de hacer efectiva la garantía, solo se podrá solicitar una nueva unidad o cambio por otro producto. En cualquier caso, se entiende que el plazo de garantía siempre será de 90 días desde la fecha de compra del producto.</p><br />
                                <h3> ¿Puedo devolver un Producto?</h3><br />
                                <p>Sí, pues como cliente tienes Derecho a Retracto, el cual puedes utilizar dentro de 10 días, contados desde la fecha en que recibiste el producto.</p><br />
                            </body>

                        </div>
                    )}
                    {this.state.count === 3 && (
                        <div>
                            <div >
                                <BotonNav nombre={"NOSOTROS"} action={() => this.setState({ count: 1 })} clase={"seccion"} />
                                <BotonNav nombre={"GARANTIAS"} action={() => this.setState({ count: 2 })} clase={"seccion"} />
                                <BotonNav nombre={"METODOS DE PAGO"} action={() => this.setState({ count: 3 })} clase={"seleccion"} />
                            </div>
                            <body className="nosotros">
                                <img border-radius="15px" src="https://www.spdigital.cl/img/pics/banner-mediodepago--2.png"></img>
                            </body>
                        </div>
                    )}

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
