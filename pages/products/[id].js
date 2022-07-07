import Head from 'next/head'
import React, {useEffect} from 'react'
import DetailProduct from './components/detailProduct'
import ImgProduct from './components/imgProduct'
import classes from "./index.module.scss"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {actionLists} from "../../redux/lists/actionLists";
import {useRouter} from "next/router";


export default function DetailsProduct({ product }) {
    const router=useRouter()

    const dispatch = useDispatch();
    const data = useSelector((state) => state.listsState);

    useEffect(() => {
        let searchText=router?.asPath?.split("/products/")[1]
        dispatch(actionLists(searchText));
        // console.log("rrrrrr",router.asPath.split("/products/")[1])
    }, []);
    useEffect(() => {
        console.log("data",data)
    }, [data]);

    return (
        <section className={classes.root}>
            <Head>
                <title>{data?.lists?.title}</title>
                <meta name="description" content={data?.lists?.body} />
                <link rel="icon" href={product.image} />
            </Head>

            <div className={`box-container ${classes.box}`}>
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <ImgProduct data={product} />
                    </div>
                    <div className='col-12 col-md-8'>
                        <DetailProduct data={data} />
                    </div>
                </div>
            </div>
        </section>
    )
}


export async function getServerSideProps(context) {


    let data = []
    await axios
        .get(
            `https://jsonplaceholder.typicode.com/posts/1`
        )
        .then((response) => {
                // data=response
        })
        .catch((error) => {
            data=error
            const errorMsg = error.message;
            console.log("error", error);
        });

    return {
        props: { product: data }
    }
}