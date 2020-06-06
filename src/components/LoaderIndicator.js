import React from 'react'
import * as Spinner from 'react-spinkit'

export default function LoaderIndicator() {
    return (
        <div
        style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1
        }}>
            <Spinner name="three-bounce" />
        </div>
    )
}
