import { Card, Typography } from '@mui/material';
import { styled } from "@mui/system";
import axios from 'axios';
import { useEffect, useState } from 'react';


const Root = styled('div')(({ theme }) => ({
  display: 'flex', flexWrap: 'wrap', paddingLeft: '15%', paddingRight: '15%',justifyContent:'center',
  [theme.breakpoints.down('md')]:{
    paddingLeft: '5%', paddingRight: '5%',
  },
  [theme.breakpoints.down('sm')]:{
    paddingLeft: '2%', paddingRight: '2%',
  },
  backgroundImage: `linear-gradient(180deg, #e6e6e6 , #cccccc)`
}))


const MainCard = (theme) => ({
  display: 'flex', width: '500px', height: '300px', margin: '15px 10px', paddingBottom: '10px', borderRadius: '38px',
  background: '#f5f5f5',
  boxShadow: `11px 11px 18px #989898, -11px -11px 18px #ffffff`,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    flexDirection:'column',
    height:'auto',
  },
  '&:hover':{
    background: '#343434',
    color:'#fff',
    transition:'1s',
    transform:`scaleY(1.02)`,

    '.DescCard':{
      margin: '10px', color: '#343434', padding: '10px', borderRadius: '14px', background: '#e6e6e6', boxShadow: `-5px 5px 10px #676767, 5px -5px 10px #808080`, textAlign: 'justify' 
    }
  },

  '.DescCard':{
    margin: '10px', color: '#fff', padding: '10px', borderRadius: '14px', background: '#575757', boxShadow: `-5px 5px 10px #3e3e3e, 5px -5px 10px #707070`, textAlign: 'justify' , transition:'1s',
  }

})

function App() {
  const THECATAPI = 'https://api.thecatapi.com/v1/breeds'

  const [catList, setCatList] = useState([])

  useEffect(() => {

    const axiosPosts = async () => {
      try {
        const response = await axios(THECATAPI)
        setCatList(response.data)
      } catch (error) {
        console.error(error)
      }
    };

    axiosPosts();

  }, [])

  // obj?.image?.url for nested obj

  return (
    <>
      <Root>

        {

          catList.map((obj, i) => (
            <Card key={i} sx={MainCard}>

              {/* first part */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>

                <img src={obj?.image?.url} alt='loading' style={{ width: '100%', height: '70%', objectFit: 'fill' }} />

                <div style={{ padding: '10px' }} >
                  <Typography variant='subtitle1'> <span style={{ fontWeight: 'bold' }} > Name :  </span> {obj.name} </Typography>

                  <Typography variant='subtitle1'> <span style={{ fontWeight: 'bold' }} > ID :  </span> {obj.id} </Typography>
                </div>

              </div>




              {/* second part */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: 1 }}>


                <Card className="DescCard">
                  <Typography variant='subtitle1'> {obj.description} </Typography>
                </Card>


                <div style={{ padding: '10px' }} >
                  <Typography variant='h5' sx={{ textAlign: 'center' }} > {obj.origin} </Typography>

                  <Typography variant='body1'> {obj.weight.metric} kgs </Typography>

                  <Typography variant='body1'> {obj.life_span} average life span </Typography>
                </div>



              </div>

            </Card>
          ))
        }


      </Root>

    </>

  );
}

export default App;
