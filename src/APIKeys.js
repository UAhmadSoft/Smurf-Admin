import React from 'react';
import {
  Container,
  makeStyles,
  Button,
  TextField,
  Divider
} from '@material-ui/core';
import Page from 'src/components/Page';
import { API_BASE_URL } from './utils/API_URLS';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { toast } from 'react-toastify';

const drawerWidth = 240;
const AppBarHeight = 64;
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    marginTop: AppBarHeight
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
    // [genBothQueries('lg', 'normal')]: {
    //   marginLeft: drawerWidth
    // },
    // [genBothQueries('lg', 'iPadPro')]: {
    //   marginLeft: drawerWidth
    // },
    // [genBothQueries('sm', 'normal')]: {
    //   marginLeft: '20%',
    //   marginTop: AppBarHeight
    // },
    // [genBothQueries('sm', 'iPad')]: {
    //   marginLeft: '20%',
    //   marginTop: AppBarHeight
    // },
    // [genMediaQuery('xs')]: {
    //   margin: 'auto',
    //   marginTop: AppBarHeight
    // },
    // [genBothQueries('xs', 'iPhoneX')]: {
    //   margin: 'auto',
    //   marginTop: AppBarHeight
    // }
  },
  Tab: {
    marginBottom: 40
  },
  Forms: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiFormControl-root': {
      margin: '20px 0',
      width: '80%'
    },
    '& .MuiInputBase-input': {
      // [genBothQueries('lg', 'normal')]: {},
      // [genBothQueries('lg', 'iPadPro')]: {},
      // [genBothQueries('sm', 'normal')]: {
      //   fontSize: '2em'
      // },
      // [genBothQueries('sm', 'iPad')]: {
      //   fontSize: '2em'
      // },
      // [genMediaQuery('xs')]: {
      //   fontSize: '1.5em'
      // },
      // [genBothQueries('xs', 'iPhoneX')]: {
      //   fontSize: '1.5em'
      // }
    },
    '& .MuiInputLabel-formControl': {
      // [genBothQueries('lg', 'normal')]: {},
      // [genBothQueries('lg', 'iPadPro')]: {},
      // [genBothQueries('sm', 'normal')]: {
      //   fontSize: '2em'
      // },
      // [genBothQueries('sm', 'iPad')]: {
      //   fontSize: '2em'
      // },
      // [genMediaQuery('xs')]: {
      //   fontSize: '1.5em'
      // },
      // [genBothQueries('xs', 'iPhoneX')]: {
      //   fontSize: '1.5em'
      // }
    }
  },
  updateBtn: {
    marginTop: 20,
    // fontSize: '1.7em',
    borderRadius: 30
    // width: 180
    // [genBothQueries('lg', 'normal')]: {},
    // [genBothQueries('lg', 'iPadPro')]: {},
    // [genBothQueries('sm', 'normal')]: {
    //   width: 130,
    //   fontSize: '1.4em'
    // },
    // [genBothQueries('sm', 'iPad')]: {
    //   fontSize: '1.4em',
    //   width: 130
    // },
    // [genMediaQuery('xs')]: {
    //   width: 130,
    //   fontSize: '1.3em'
    // },
    // [genBothQueries('xs', 'iPhoneX')]: {
    //   width: 130,
    //   fontSize: '1.3em'
    // },
    // [genMediaQuery('xs', 'normal', 375)]: {},
    // [genBothQueries('xs', 'iPhoneX', 375)]: {}
  }
}));

const useInputState = (initialValue = '') => {
  const [inputTxt, setInputTxt] = React.useState(initialValue);

  const handleChange = e => {
    setInputTxt(e.target.value);
  };

  const reset = () => {
    setInputTxt('');
  };

  return [inputTxt, setInputTxt, handleChange, reset];
};

const APIKeys = () => {
  const classes = useStyles();

  const [defaultTxt, setDefaultTxt] = React.useState({
    unSplashTxt: '',
    shutterStockText: '',
    pixeBeyTxt: ''
  });

  React.useEffect(() => {
    (async () => {
      // * Get Default ValuesOF Config
      const res = await axios.get(`${API_BASE_URL}/config`);
      console.log('res', res);

      console.log('res.data', res.data);
      const configObj = res.data.configObj;
      setGooTxt(configObj.unsplashKey);
      setFaceTxt(configObj.pixeBayKey);

      setClientLinTxt(configObj.shutterStockKey);

      setDefaultTxt({
        unSplashTxt: configObj.unsplashKey,
        shutterStockText: configObj.shutterStockKey,
        pixeBeyTxt: configObj.pixeBayKey
      });
    })();
  }, []);

  const [
    unSplashTxt,
    setGooTxt,
    handleUnsplashTxtChange,
    resetGooTxt
  ] = useInputState('');
  const [
    pixeBayKey,
    setFaceTxt,
    handlePixeKeyTxtChange,
    resetFaceTxt
  ] = useInputState('');
  const [
    shutterStockKey,
    setClientLinTxt,
    handleLinkedClientIdTxtChange,
    resetLinkedClientIdTxt
  ] = useInputState('');

  const onGooSubmit = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/config`, {
        unSplashKey: unSplashTxt
      });

      console.log('res', res);
    } catch (err) {
      console.log('err', err);
    }
  };
  const changePixebayKey = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/config`, {
        pixeBayKey: pixeBayKey
      });

      console.log('res', res);
    } catch (err) {
      console.log('err', err);
    }
  };
  const changeShutterKey = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/config`, {
        shutterStockKey: shutterStockKey
      });

      console.log('res', res);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleOnCopy = () => {
    toast.success('Copied!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };
  return (
    <Page className={classes.root} title="API Keys">
      <Container maxWidth="lg">
        <div className={classes.Tab}>
          <h2
            style={{
              width: '100%'
            }}
          >
            UnSplash API Configuration
          </h2>
          <form className={classes.Forms}>
            <h3
              style={{
                marginTop: 20
              }}
            >
              Current UnSplash Key :
            </h3>
            <br />
            <CopyToClipboard
              text={defaultTxt.unSplashTxt}
              onCopy={handleOnCopy}
            >
              <span>{defaultTxt.unSplashTxt}</span>
            </CopyToClipboard>

            <TextField
              variant="outlined"
              id="standard-password-input"
              label="UnSplash Key"
              type="text"
              value={unSplashTxt}
              onChange={handleUnsplashTxtChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.updateBtn}
              onClick={onGooSubmit}
            >
              Update
            </Button>
          </form>
        </div>

        <Divider
          style={{
            marginBottom: 30
          }}
        />
        <div className={classes.Tab}>
          <h2
            style={{
              width: '100%'
            }}
          >
            PixeBay API Configuration
          </h2>
          <form className={classes.Forms}>
            <h3
              style={{
                marginTop: 20
              }}
            >
              Current PixeBay Key :
            </h3>
            <br />
            <CopyToClipboard text={defaultTxt.pixeBeyTxt} onCopy={handleOnCopy}>
              <span>{defaultTxt.pixeBeyTxt}</span>
            </CopyToClipboard>

            <TextField
              variant="outlined"
              id="standard-password-input"
              label="Pixebay Key"
              type="text"
              value={pixeBayKey}
              onChange={handlePixeKeyTxtChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.updateBtn}
              onClick={changePixebayKey}
            >
              Update
            </Button>
          </form>
        </div>

        <Divider
          style={{
            marginBottom: 30
          }}
        />
        <div className={classes.Tab}>
          <h2
            style={{
              width: '100%'
            }}
          >
            Shutter Stock API Configuration
          </h2>
          <form className={classes.Forms}>
            <h3
              style={{
                marginTop: 20
              }}
            >
              Current Shutter Stock Key :
            </h3>
            <br />
            <CopyToClipboard
              text={defaultTxt.shutterStockText}
              onCopy={handleOnCopy}
            >
              <span>{defaultTxt.shutterStockText.slice(0, 30)}....</span>
            </CopyToClipboard>

            <TextField
              variant="outlined"
              id="standard-password-input"
              label="Shutter Stock Key"
              type="text"
              value={shutterStockKey}
              onChange={handleLinkedClientIdTxtChange}
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.updateBtn}
              onClick={changeShutterKey}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default APIKeys;
