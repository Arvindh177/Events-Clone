import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState('');
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt">{text}</h2>
        );
    }

    function inputDescription(text) {
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header , description) {
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }
async function addPhotoByLink(ev) {
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
     setAddedPhotos(prev => {
        return [...prev, filename];
     })
     setPhotoLink('');
}


function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData();
    for(let i=0;i<files.length;i++){
        data.append('photos',files[i]);
    }
    
    axios.post('/upload', data, {
        headers: {'Content-type':'multipart/form-data'} 
    }).then(response => {
        const {data:filenames} = response;
        setAddedPhotos(prev => {
            return [...prev, ...filenames];
         })
    })
}
    
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
                    {preInput('Title','Title of your event')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title,my events"/>

                    {preInput('Address','Address of occurance')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>

                    {preInput('Photos','More = better')}
                    <div className="flex gap-2">
                        <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add using a link ... .jpeg'/> 
                        <button onClick={addPhotoByLink} className="bg-pray-200 grow px-4 rounded-2xl">Add photo</button>
                    </div>
                    
                    <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div>
                                <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link}/>
                                </div>
                        ))}
                    <label className="cursor-pointer border items-center bg-transparent justify-center gap-1 flex rounded-2xl p-2 text-2xl text-gray-600 mb-3">
                    <input type="file" className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload</label>
                    </div>

                    {preInput('Description','Add description of the event')}
                    <textarea value={description} 
                    onChange={ev => setDescription(ev.target.value)} />

                    {preInput('Perks','Add perks')}
                    
                    <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg: grid-cols-6">
                        <Perks selected={perks} 
                        onChange={setPerks}/>
                    </div>

                    {preInput('Extra info','Additional info about the event')}
                    <textarea value= {extraInfo} 
                    onChange={ev => setExtraInfo(ev.target.value)} /> 

                    {preInput('Check in&Out times, max guests','Add check in and check out times along with max number of guests per se')}
                    <div className="grid gap-2 sm:grid-cols-3"> 
                        <div>
                            <h3 className="mt-2 -mb-1">Check-in time</h3>
                            <input type="text" value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} placeholder="14"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check-out time</h3>
                            <input type="text" value={checkOut} 
                            onChange={ev=> setCheckOut(ev.target.value)} placeholder="11"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests allowed</h3>
                            <input type="number" value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <button className="primary my-4">Save</button>
                    </div>
                    
                </form>
                </div>
            )}
        </div>
    )
}