
import CustomBox from './CustomBox'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ViewWorkers from './ViewWorkers';

export default function Workers () {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <CustomBox>
          <h1>
            Workers
          </h1>
          <Button variant = "contained" 
                  color = "codGray"
                  onClick={() => {
                    navigate("/addWorker")
                  }}>
            Add Workers
          </Button>
          
          <ViewWorkers></ViewWorkers>
        </CustomBox>
      </Container>
    </div>
  )
}
