import './App.css';
import { useEffect, useState } from 'react'
import Job from './components/Jobs'
//https://hacker-news.firebaseio.com/v0/jobstories.json
function App() {
  const [jobIds, setJobIds] = useState(null)
  const [fetchDetails, setFetchDetails] = useState([])
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetchJobs(page)
  },[page])

  const PAGE_NO = 10
   async function fetchJobIds(currPage){
     let jobs = jobIds
        if(!jobs){
         const res = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
          jobs = await res.json()
          setJobIds(jobs)
        }
        const startPage = currPage * PAGE_NO
        const endPage = startPage + PAGE_NO
        return jobs.slice(startPage, endPage)
        
   }

  async function fetchJobs(currPage){
    const jobIds = await fetchJobIds(currPage)
    setFetchDetails(true)
    
    const jobsForPage = await Promise.all(
      jobIds.map(id => fetch( `https://hacker-news.firebaseio.com/v0/item/${id}.json`,).then(res => res.json()))
    )
      setJobs([...jobs, ...jobsForPage])
      setFetchDetails(false)
  }

  return (
    <div className="container">
      <h1>Jobs Board</h1>
      {!jobIds ? <div>...Loading</div> :
      <div className="jobs">
         {jobs && jobs.map(jb => <Job job={jb} />)}
      </div>}
      <button onClick={() => setPage(page + 1)}>Load More</button>
     
    </div>
  );
}

export default App;
