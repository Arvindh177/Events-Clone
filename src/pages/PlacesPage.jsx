import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    const {action} = useParams();
    
    return(
        <div>
            {action != 'new' && (
                
            <div className='mt-4  text-center'>
            <Link className='inline-flex bg-primary gap-2 text-white py-2 px-6 rounded-full' to = {'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>  Add new event
                </Link>
        </div>
            )}

            {action === 'new' && (
             <div>
                <form>
                    <h2 className="text-2xl mt">Title</h2>
                    <p className="text-gray-500 text-sm">Title of your event</p>
                    <input type="text" placeholder="title,my events"/> 
                    <h2 className="text-2xl mt">Address</h2>
                    <p className="text-gray-500 text-sm">Address of occurance</p>
                    <input type="text" placeholder="address"/>
                    <h2 className="text-2xl mt">Photos</h2>
                    <p className="text-gray-500 text-sm">More = better</p>
                    <div>
                        <input type="text" placeholder='Add using a link ... .jpeg'/> 
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">+</button>
                    </div>
                    

                </form>
                </div>
            )}
        </div>
    )
}