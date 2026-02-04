import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const ProjectInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await axios.get(
          `https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects/${id}`
        )
        setProject(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) return <h3>Loading project details...</h3>
  if (!project) return <h3>Project not found</h3>

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2>{project.ProjectName}</h2>
      <p className="text-muted">{project.Details}</p>

      <div className="card mt-3">
        <div className="card-body">
          <p><strong>Department:</strong> {project.Department}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(project.startDate * 1000).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(project.EndDate * 1000).toLocaleDateString()}
          </p>
          <p><strong>Priority:</strong> {project.priority}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo
