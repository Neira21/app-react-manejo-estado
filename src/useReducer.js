import React from "react";

const SECURITY_CODE = 'paradigma';


function UseReducer(props){
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(()=>{
        console.log("Empezando el efecto");
        if(state.loading){
            setTimeout(()=>{
                console.log("Haciendo la validación");

                if(state.value === SECURITY_CODE){
                    dispatch({type: 'CONFIRM'});
                }else {
                    dispatch({type: 'ERROR'})
                }

                console.log("Terminando la validación");
            }, 3000);
        }       

        console.log("Terminando el efecto");

    },[state.loading]);

    if(!state.deleted && !state.confirmed){
        return(
            <div>
                <h2>Eliminar {props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
    
                {(state.error && !state.loading) && (<p>El código de seguridad es incorrecto</p>)}
                
                {state.loading && <p>Cargando...</p>}
                
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(e)=>{
                        dispatch({type: 'WRITE', payload: e.target.value});
                        //onWrite(e.target.value);
                    }}
                />
                <button
                    onClick={()=>{
                        dispatch({type: 'CHECK'});
                    }}
                >Comprobar
                </button>
            </div>
        );
    }else if(state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <p>Pedimos Confirmación. ¿Estás Seguro?</p>
                <button
                    onClick={()=>{
                        dispatch({type: 'DELETE'});
                    }}
                >
                    Sí, eliminar
                </button>
                <button
                    onClick={()=>{
                        dispatch({type: 'RESET'});
                    }}
                >
                    No, me arrepentí
                </button>
            </React.Fragment>
        );
    }else {
        return(
            <React.Fragment>
                <p>Elminado con éxito</p>
                <button
                    onClick={()=>{
                        dispatch({type: 'RESET'});
                    }}
                >
                    Resetear, volver atrás
                </button>
            </React.Fragment>
        );
    }
}
//----------------------------------------------
const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const reducerObject = (state, payload) => ({ 
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'CONFIRM': {
        ...state,
        loading: false,
        error: false,
        confirmed: true
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    }
})

const reducer = (state, action) =>{
    if(reducerObject(state)[action.type] ){
        return reducerObject(state, action.payload)[action.type]
    }else{
        return state;
    }
}


export {UseReducer};