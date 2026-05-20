import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

import api from '../lib/axios';

const CreatePage = () => {

  const [title, setTitle]=useState("");
  const [content, setContent]=useState("");
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();

      if(!title.trim() || !content.trim()){
        toast.error("all fields required")
        return;
      }

      setLoading(true)
      try {
        await api.post('/notes/add',{
          title,
          content
        })

        toast.success("Note created successfully...")
        navigate("/")
      } catch (error) {
        console.log("error creating note",error);
         if(error.response.status === 429){
           toast.error("Slow down, you are creating notes too fast",{
            duration:4000,
            icon:"💀"
           })
         }else{
          toast.error("Failed to create note")
         }
        
      }finally{
        setLoading(false)
      }


  }
  return (
    <div className='min-h-screen bg-base-300'>
      <div className='container mx-auto px-4 py-6'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-4'/>
            Back to Home
          </Link>

        {/* form card */}
      <div className="card bg-base-200 border border-base-content/10 shadow-xl">
        <div className="card-body">

          <h2 className="text-4xl font-bold mb-8">
            Create a New Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* title */}
            <div className="space-y-2">
              <label className="font-medium text-xl">
                Title
              </label>

              <input
                type="text"
                placeholder="Note Title"
                className="input input-bordered w-full outline-none"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
              />
            </div>

            {/* content */}
            <div className="space-y-2">
              <label className="font-medium text-xl">
                Content
              </label>

              <textarea
                rows={4}
                placeholder="Write your note content here..."
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                className="textarea textarea-bordered w-full resize-none outline-none"
              />
            </div>

            {/* button */}
            <div className='card-actions justify-end'>
              <button
                type='submit' 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Note'}
              </button>
            </div>

          </form>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage