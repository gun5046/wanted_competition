import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid,TextField, Button} from '@material-ui/core';
import QRcode from 'qrcode';
import QrReader from 'react-qr-reader';

function App() {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [text, setText] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);

  const handleErrorFile = (error) =>{
    console.log(error);
  };
  const handleScanFile = (result)=>{
    if(result){
        setScanResultFile(result);
    }
  };
  const onScanFile = () =>{
    qrRef.current.openImageDialog();
  };

  const generateQrCode = async () => {
    try{
        const response = await QRcode.toDataURL(text);
        setImageUrl(response);
    }catch(e){
        console.log(e);
    }
  }
  const handleErrorWebCam= (error) =>{
    console.log(error);
  }

  const handleScanWebCam = (result) =>{
    if(result){
        setScanResultWebCam(result);
    }
  }

  return (
    <Container className={classes.container}>
        <Card>
            <h2 className={classes.title}>Generate Download & Scan QR code with react js</h2>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xl={4} lg={4} md={6} xs={12}>
                        <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)} />
                        <Button Classname={classes.btn} variant="contained"
                         color="primary" onClick={() => generateQrCode()}>Generate</Button>
                        <br/>
                        <br/>
                        <br/>
                        {imageUrl ? (
                        <a href={imageUrl} download>
                        <img src={imageUrl} alt="img" />
                        </a>) : null}
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12}>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr code</Button>
                        <QrReader
                            ref={qrRef} // 요소
                            delay={300} // 감지 delay
                            style={{width: '100%'}}
                            onError = {handleErrorFile} // event handler
                            onScan={handleScanFile} //event handler
                            legacyMode //카메라 off
                        />
                        <h3>Scanned Code :{scanResultFile}</h3>

                        <a href={scanResultFile}> move</a>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12}>
                        <h3>Qr code Scan by WebCam</h3>
                        <QrReader
                            delay ={300}
                            style={{width:'100%'}}
                            onError={handleErrorWebCam}
                            onScan={handleScanWebCam}
                        />
                        <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Container>
  );
}
const useStyles = makeStyles((theme)=>({
    container: {
        marginTop:10
    },
    title: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3f51b5',
        color: '#fff',
        padding :20
    },
     btn : {
        marginTop:10,
        marginBottom:20
     }
}));
export default App;
