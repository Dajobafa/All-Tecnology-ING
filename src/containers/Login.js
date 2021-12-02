import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/All.css';
import axios from 'axios';
import imgexport from '../imagenes/imgexport';
import users from "./usuarios.json";


const baseUrl = "http://localhost:3001/usuarios/";
const url2 = "http://localhost:3001/Loged/";
const Loged ={};

export default class Login extends Component {
    state = {
        data: [],
        form: {
            estado:'',
            id: '',
            email: '',
            Apellido_materno: '',
            Apellido_paterno: '',
            Nombre: '',
            username: '',
            password: ''

        }
  
    }
   
    logeo = async () => {    
        
        this.cuentaLoged(this.state.form)    
        await axios.post(url2, Loged)
            .then(response => {
                
            }).catch(error => {
            console.log(error.message);
        })
    }
    cuentaLoged =(empresa)=>{
        Loged['Correo']=empresa.email;
        Loged['Contraseña']=empresa.password;
        
}

    
    seleccionarEmpresa = (empresa) => {
        this.setState({
            form: {
                estado:empresa.estado,
                id: empresa.id,
                email: empresa.email,
                Apellido_materno: empresa.Apellido_materno,
                Apellido_paterno: empresa.Apellido_paterno,
                Nombre: empresa.Nombre,
                username: empresa.username,
                password: empresa.password
    
            }
        })

    }
    peticionGet =async () => {
        await axios.get(baseUrl).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(baseUrl + this.state.form.id, this.state.form).then(response => {
            
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
    peticionPost=async ()=>{
        await axios.post(users,this.state2.form).then(response=>{
            alert('Registrado');
            
            
        })
    }

    registrarse = async () => {
        window.location.href = "./Register"
    }
    
    iniciarSesion = async () => {
        await axios.get(baseUrl, { params: {estado:false, email: this.state.form.email, password: this.state.form.password } })
            .then(response => {
                return response.data
            })
            .then(response => {                
                if (response.length > 0) {    
                    if(this.state.data.email==='david@gmail.com'){ 
                        window.location.href = "./loged_admin";
                    }
                    else{
                        window.location.href = "./loged_principal";     
                    }

                }else{
                    document.getElementById("error").style.color='red';
                }
            })
            .catch(error => {
                
            })
    }



    render() {
        return (
            <html className="fondo">
                <body id="tarjeta">
                    <section>
                        <img src={imgexport.logo} width="200" height="150" id="logo2" />
                        <header>
                            <h3 id="iniciodesesion">INICIAR SESI&Oacute;N</h3>
                        </header>
                        <h4 className="centrartextos">Ingrese su correo electronico</h4>
                        <input
                            type="email"
                            name="email"
                            placeholder="algo@ejemplo.com"
                            className="entradas"
                            onChange={this.handleChange} />


                        <h4 className="centrartextos">Ingrese su Contrase&ntilde;a </h4>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contrase&ntilde;a"
                            className="entradas"
                            onChange={this.handleChange} />
                        <p id="error" Style='font-size: 13px;font-family: cursive;color:rgba(255, 238, 2, 0.425)'>Email o Contraseña Incorrecta</p>
                        <button id="ingresar" onClick={() => {this.seleccionarEmpresa(this.state.data);this.iniciarSesion();this.logeo(this.state.form)}}>Iniciar Sesion</button>
                        
                        <br />
                        
                        <form action="/Principal">
                            <input type="submit" value="Ver Catalogo" id="ingresar" />
                        </form>
                        <h4 className="centrartextos" > ¿ A&uacute;n no tienes cuenta? </h4>
                        <button id="ingresar" onClick={() => this.registrarse()}>Registrarse</button>
                    </section>
                </body>
            </html >


        )
    }
}
