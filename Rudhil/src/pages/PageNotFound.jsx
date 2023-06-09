import React from "react";

const PageNotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.text}>Page Not Found</h1>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    text: {
        fontSize: "48px",
        fontWeight: "bold",
        textAlign: "center",
    },
};

export default PageNotFound;
