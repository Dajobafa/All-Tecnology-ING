import React, { Fragment } from 'react'

const BotonNav = (props) => {
    return (
        <Fragment>
            <button
                onClick={props.action}                
                className={props.clase}>
                {props.nombre}
            </button>
        </Fragment>
    )
}

export default BotonNav
