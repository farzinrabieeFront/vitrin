import React from 'react';
import classes from "./../index.module.scss"


export default function ImgProduct({ data }) {
    return (
        <aside className={classes.imageCard}>
            <img src={"/assset/images/pic.jpg"} alt={data.title}/>
        </aside>
    )
}
