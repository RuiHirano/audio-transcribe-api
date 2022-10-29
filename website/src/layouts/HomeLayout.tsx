import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
interface Props {
    children?: any;
    title: string
}

const HomeLayout: React.FC<Props> = props => {
    const { children, title } = props;

    return (
        <div style={{ backgroundColor: '#e8ecef', minHeight: '100vh' }}>
            <Box sx={{ height: { xs: '100%', md: '100%' } }}>
                <Header title={title} />
            </Box>
            <div>
                {children}
            </div>
            <div style={{ flexGrow: 1, height: '100%', marginTop: 50 }} />
            <div style={{ height: '15vh' }}>
                <Footer />
            </div>
        </div>
    );
};

export default HomeLayout;
