import Directory from '../../components/directory/directory.component';
import { Outlet } from 'react-router-dom';
const Home = () => {
  
    return (
        <>
             <Outlet/>
            <Directory />
        </>
      
  );
}

export default Home;