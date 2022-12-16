import React from "react";

class ClassState extends React.Component {
    
    UNSAFE_componentWillMount(){
        console.log("componentWillMount");
    }

    //Cada vez que se llame a un compenente para actualizar el render
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    componentDidMount(){
        console.log("componentDidMount");
    }

    constructor(props){
        super(props);
        this.state = {
            error: true,
            
        }
    }

    render(){
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                
                <p>Por favor, escribe el código de seguridad</p>

                

                {this.state.error && <p>El código de seguridad es incorrecto</p>}

                <input placeholder="Código de seguridad"/>
                <button
                    onClick={()=>{this.setState({error: !this.state.error})}}
                >
                    Comprobar
                </button>
            </div>
        );
    }
}

export {ClassState};