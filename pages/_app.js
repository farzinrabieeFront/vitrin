import '../styles/globals.css'
import {Provider} from "react-redux";
import store from "../redux/store"
import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/common/layout/Layout";

function MyApp({Component, pageProps}) {


    return (

        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />


            </Layout>
        </Provider>


    )


}

export default MyApp
