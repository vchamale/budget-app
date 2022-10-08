
import Test from './Components/Test';
import {Typography} from '@mui/material';
import {AppBar} from '@mui/material';

function App() {
  return (
    <div >
      <AppBar />
      <Typography variant="h1"> Hola Jaime!</Typography>
      <Test />
      <AppBar position="fixed">
        <Typography variant="span">James</Typography>
      </AppBar>
      
    </div>
  );
}

export default App;
