import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  jobs: [],
  filteredJobs:[],
  isLoading:false,
  error:null
}

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs:(state,action)=>{
      state.jobs=action.payload;
      state.filteredJobs=[...action.payload]
    },
     addJob:(state,action)=>{
      state.jobs.push(action.payload);
      //check the status before add
if (!state.currentFilter || state.currentFilter === action.payload.status) {
  state.filteredJobs.push(action.payload);
} 
  },
 updateJob: (state, action) => {
  const { id, updatedData } = action.payload;
  state.jobs = state.jobs.map((job) =>
    job.id === id ? { ...job, ...updatedData } : job
  );
  state.filteredJobs = state.filteredJobs.map((job) =>
    job.id === id ? { ...job, ...updatedData } : job
  );
},
   deleteJob: (state, action) => { 
    state.jobs = state.jobs.filter(job => job.id !== action.payload); 
    state.filteredJobs = state.filteredJobs.filter(job => job.id !== action.payload); },

filterJobs: (state, action) => {
  state.filteredJobs = action.payload === 'all' 
    ? state.jobs.slice() 
    : state.jobs.filter(job => job.status === action.payload);
},

    setLoading: (state, action) => { 
    state.isLoading = action.payload; },

    setError: (state, action) => { 
      state.error = action.payload; }
}})

// Action creators are generated for each case reducer function
export const { setJobs, addJob, updateJob,deleteJob,filterJobs,setLoading,setError} = jobSlice.actions

export default jobSlice.reducer