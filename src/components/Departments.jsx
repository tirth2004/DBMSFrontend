
import CustomBox from './CustomBox'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Departments () {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <CustomBox>
          <h1>
            Manage departments here
          </h1>
          <Button variant = "contained" 
                  color = "codGray"
                  onClick={() => {
                    navigate("/admin/addDepartment")
                  }}>
            Add department
          </Button>
          <Button variant = "contained" 
                  color = "codGray"
                  onClick={() => {
                    navigate("/admin/viewDepartments")
                  }}>
            View Departments
          </Button>
        </CustomBox>
      </Container>
    </div>
  )
}
