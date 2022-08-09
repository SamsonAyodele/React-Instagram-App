import { useEffect, useState } from 'react'
import getPhotoUrl from 'get-photo-url'
import profileIcon from '../assets/profileIcon.svg'
import { db } from '../dexie'

const Bio = () => {
    const [userDetails, setUserDetails] = useState({
        name: 'Samson Ayodele Idowu',
        about: 'Aspiring Full Stack Developer.',
    })

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(profileIcon)

    useEffect(() => {
        const setDataFromDb = async () => {
            const userDetailsFromDb = await db.bio.get('info')
            const profilePhotoFromDb = await db.bio.get('profilePhoto')
            userDetailsFromDb && setUserDetails(userDetailsFromDb)
            profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb)
        }
        setDataFromDb()
    }, [])

    const updateUserDetails = async (event) => {
        event.preventDefault()

        const objectData = {
            name: 'Samson Ayodele Idowu',
            about: 'Aspiring Full Stack Developer.',
        }
        setUserDetails(objectData)
        await db.bio.put(objectData, 'info')
        setEditFormIsOpen(false)
    }

    const updateProfliePhoto = async () => {
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
        setProfilePhoto(newProfilePhoto)
        await db.bio.put(newProfilePhoto, 'profilePhoto')
    }

    const editButton =  <button onClick={() => setEditFormIsOpen(true)}>Edit</button>

    const editForm = (
        <form className='edit-bio-form' onSubmit={(e) => updateUserDetails(e)}>
            <input type="text" id='' name='nameOfUser' placeholder='Your name' />
            <input type="text" id='' name='aboutUser' placeholder='About you' />
            <br />
            <button type='button' className='cancel-button' onClick={() => setEditFormIsOpen(false)}>
                Cancel
            </button>
            <button type='submit'>Save</button>
        </form>
    )

    

    return (
        <section className="bio">
            <input type="file" accept='image/*' name='photo' id='profilePhotoInput' />
            <label htmlFor="profilePhotoInput" onClick={updateProfliePhoto}>
                <div className="profile-photo" role='button' title="click to edit photo">
                    <img src={profilePhoto} alt="profile" />
                </div>
            </label>
            
            <div className="profile-info">
                <p className='name'>{userDetails.name}</p>
                <p className='about'>{userDetails.about}</p>
               
                {editFormIsOpen ? editForm : editButton}
            </div>
        </section>
    )
}


export default Bio