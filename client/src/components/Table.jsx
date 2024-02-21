import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'

const Table = () => {

    const [name, setName] = useState('')
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(null)


    async function fetchAllData() {
        const response = await axios.get('https://react-app-0ziy.onrender.com/')
        setData(response.data)
    }

    useEffect(() => {
        fetchAllData()
    }, [])
    
    


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(updateData){
            // update
            await axios.put('https://react-app-0ziy.onrender.com/api/update', {id: updateData._id, name})
        }else{
            // create
            await axios.post('https://react-app-0ziy.onrender.com/api/create', {name})
        }

        setName('')
        fetchAllData()
    }
    return (
        <div className='d-flex py-5'>
            <Row className='m-auto w-25'>
                <Col lg="12" className='m-auto'>

                    <h5 className='text-center'>
                        Data Table
                    </h5>

                    <h6 className='text-danger'>
                        API count : 0
                    </h6>

                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((n, i)=>(
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{n.name}</td>
                                <td>
                                <Button onClick={()=>{
                                    setName(n.name)
                                    setUpdateData(n)
                                }} type="button">Update</Button>
                                </td>
                            </tr>
                        ))}
                            
                           
                        </tbody>
                    </table>



                </Col>



            </Row>
        </div>
    )
}

export default Table