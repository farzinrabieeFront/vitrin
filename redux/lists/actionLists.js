import axios from "axios";

const fetchListsRequest = () => {
    return {
        type: "FETCH_LISTS_REQUEST",
    };
};
const fetchListsSuccess = (lists, pagination) => {
    return {
        type: "FETCH_LISTS_SUCCESS",
        payload: {lists, pagination},
    };
};

export const actionLists = (searchText, search) => {
    return (dispatch) => {
        dispatch(fetchListsRequest());

        axios
            .get(
                search ? `https://jsonplaceholder.typicode.com/posts?${
                        search ? `userId=` + search : ""
                    }` :
                    `https://jsonplaceholder.typicode.com/posts/${searchText ? searchText : "/"}`
            )
            .then((response) => {
                if (response.status === 200) {
                    dispatch(fetchListsSuccess(response.data));
                }
            })
            .catch((error) => {
                const errorMsg = error.message;
                console.log("error", error);
            });
    };
};
