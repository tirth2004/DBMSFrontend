
import CustomBox from './CustomBox'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Workers () {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <CustomBox>
          <h1>
            Manage workers here
          </h1>
          <Button variant = "contained" 
                  color = "codGray"
                  onClick={() => {
                    navigate("/addWorker")
                  }}>
            Add Workers
          </Button>
          <Button variant = "contained" 
                  color = "codGray"
                  onClick={() => {
                    navigate("/viewWorkers")
                  }}>
            View Workers
          </Button>
        </CustomBox>
      </Container>
    </div>
  )
}
