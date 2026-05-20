
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NoteNotFound from '../components/NoteNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes,setNotes]=useState([])
  const [loading,setLoading]=useState(false);

  useEffect(()=>{

    const fetchNotes=async()=>{
      setLoading(true);
      try { 
        const res=await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Error fetching notes. Please try again later.');
        }

      } finally {
        setLoading(false);
      }

    }

    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
    
      {isRateLimited && <RateLimitedUI/>}

      <div className='max-w-5xl mx-auto p-4 mt-6'>
        {loading && (
          <p className='text-center text-primary py-10'>Loading notes...</p>
        )}

        {notes.length === 0 && !isRateLimited && <NoteNotFound/>}

        {
          notes.length > 0 && !isRateLimited && (
              <div>
              <h1 className='text-4xl font-bold mb-12 text-center text-primary'>My Notes</h1>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
              </div>
          )
        }
      </div>
    </div>
  )
}

export default HomePage