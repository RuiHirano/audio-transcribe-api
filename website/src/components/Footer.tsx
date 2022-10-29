import React from "react";
import { Typography } from '@mui/material'
export interface Props {
}

const Footer: React.FC<Props> = () => {


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2b2b2b', height: '100%' }}>
      <div>
        <Typography style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Astella</Typography>
        <Typography style={{ color: 'white', fontSize: 18 }}>Copyright ©️ 2022 Astella</Typography>
      </div>
    </div>
  );
};

export default Footer;
