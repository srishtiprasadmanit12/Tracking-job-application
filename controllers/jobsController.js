const createJob=async(req,res)=>{
res.send('create job');
}
const deleteJob=async(req,res)=>{
    res.send('delete job');
}
const getAllJobs=async(req,res)=>{
    res.send('getAll job');
}
const updateJob=async(req,res)=>{
    res.send('update job');
}
const showStats=async(req,res)=>{
    res.send('showStats job');    
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }