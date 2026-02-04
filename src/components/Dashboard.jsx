import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")

    const navigate = useNavigate()

    useEffect(() => {

        async function fetchData() {
            try {
                const res = await axios.get("https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects")
                setProjects(res.data)
                console.log(res.data)

            } catch (error) {
                console.log(error)
            }

        }

        fetchData()
    }, [])

    const filteredProjects = projects.filter((proj) => {
        const matchesSearch = proj.ProjectName.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === "All" || proj.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className="container mt-4">
            <h2 className="mb-3">📊 Projects Dashboard</h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input type="text"
                        className='form-control'
                        placeholder='🔍 Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className='form-select'
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Under Review">Under Review</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Pending Approval">Pending Approval</option>
                        <option value="Under Review">Under Review</option>


                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Project Name</th>
                            <th>Department</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProjects.map((proj, index) => (
                            <tr 
                            key={proj.id}
                            style={{cursor: "pointer"}}
                            onClick={() => navigate(`/projects/${proj.id}`)}
                            >
                                <td>{index + 1}</td>
                                <td className="fw-semibold">{proj.ProjectName}</td>
                                <td>{proj.Department}</td>
                                <td>
                                    {new Date(proj.startDate * 1000).toLocaleDateString()}
                                </td>
                                <td>
                                    {new Date(proj.EndDate * 1000).toLocaleDateString()}
                                </td>
                                <td>
                                    <span
                                        className={`badge ${proj.status === "Active"
                                                ? "bg-success"
                                                : proj.status === "Completed"
                                                    ? "bg-primary"
                                                    : "bg-secondary"
                                            }`}
                                    >
                                        {proj.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Dashboard
