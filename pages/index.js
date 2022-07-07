import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {useEffect, useState} from "react";
import {CircularProgress, Pagination} from "@mui/material";
import {Button, Card, Col, Row} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
// import ModalCustom from "../components/modal/ModalCustom";
import {actionLists} from "../redux/lists/actionLists";
import axios from "axios";
import Style from "../styles/Home.module.css"
import Link from "next/link";

function Home(props) {
    console.log("resutl", props)

    /////////////////////////////////////////////////////////////////////////////////states
    const data = useSelector((state) => state.listsState);
    const [page, setPage] = useState(1);
    const [sliceState, setSliceState] = useState(10);
    const [item, setItem] = useState("");
    const [open, setOpen] = useState(false);
    /////////////////////////////////////////////////////////////////////////////////hooks
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionLists());
    }, []);
    useEffect(() => {
        setSliceState(page * 10);
    }, [page]);
    /////////////////////////////////////////////////////////////////////////////////functions


    const handleChangePagination = (event, value) => {
        setPage(value);
    };

    return (
        <>
            {data.loading ? (
                <CircularProgress/>
            ) : (
                <div>
                    <Row className="justify-content-start mb-4">
                        {data.lists.length > 0
                            ? data.lists
                                .map((itm, ind) => (
                                    <Col
                                        xs={12}
                                        md={6}
                                        lg={3}
                                        key={ind}
                                        className="mb-3 d-flex justify-content-center"
                                    >
                                        <Card className={`${Style.card} shadow`}>
                                            <div className={Style.cardImg}>
                                                <Card.Img
                                                    variant="top"
                                                    src={"/assset/images/pic.jpg"}
                                                />
                                            </div>

                                            <Card.Body>
                                                <Card.Title>
                                                    <div>userID : {itm.userId}</div>
                                                    <div className={Style.ellipsis}> {itm.title}</div>
                                                </Card.Title>
                                                <Card.Text>
                                                    <div className={Style.ellipsis2}>{itm.body}</div>
                                                </Card.Text>
                                                <Link href="products/[id]" as={`products/${itm.id}`}>
                                                    <Button
                                                        className="btn-success"
                                                        // onClick={() => handleOpen(itm)}
                                                    >
                                                        details & edit
                                                    </Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                .slice(sliceState - 10, sliceState)
                            : null}
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" xs={12}>
                            {data?.lists?.length > 10 && (
                                <Pagination
                                    count={Math.floor(data?.lists?.length / 10)}
                                    page={page}
                                    onChange={handleChangePagination}
                                />
                            )}
                        </Col>
                    </Row>

                    {/*<ModalCustom*/}
                    {/*    item={item}*/}
                    {/*    open={open}*/}
                    {/*    handleOpen={handleOpen}*/}
                    {/*    handleClose={handleClose}*/}
                    {/*/>*/}
                </div>
            )}

        </>
    )
}

export default Home


export async function getServerSideProps() {
    let result = [];

    axios
        .get(
            `https://jsonplaceholder.typicode.com/posts`
        )
        .then((response) => {
            result=["2"]

        })
        .catch((error) => {
            result=["2"]
            const errorMsg = error.message;
            console.log("error", error);
        });


return {
    props: {
        result,
    },
};
}


