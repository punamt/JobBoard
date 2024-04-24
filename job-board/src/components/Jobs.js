const Job = ({job}) => {
  return(
    <div className="job">
            <h3>{job.title}</h3>
            <div>By:{' '}{job.by} {' '}
            {new Date(job.time * 1000).toLocaleString()}
            </div>
    </div>
  )
}

export default Job
